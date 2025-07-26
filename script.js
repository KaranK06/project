let sortByDeadlineAsc = true; // For deadline sorting (ascending or descending)
let currentFilter = ""; // Store current filter value for task priority

// Listen for form submission to add a new task
document.getElementById('taskForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  await fetch('add_task.php', { method: 'POST', body: formData });
  this.reset();
  loadTasks(); // Reload tasks after adding a new task
});

// Function to load tasks from the backend
async function loadTasks() {
  const res = await fetch('get_tasks.php');
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = ''; // Clear the task list before rendering new tasks

  let completedCount = 0;
  let pendingCount = 0;

  // Filter tasks based on priority
  let filteredTasks = tasks.filter(task => {
    return currentFilter ? task.priority == currentFilter : true;
  });

  // Sort tasks by deadline (ascending or descending)
  if (sortByDeadlineAsc) {
    filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else {
    filteredTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  }

  // Render filtered and sorted tasks
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task' + (task.is_complete == 1 ? ' completed' : '');
    li.innerHTML = `
      <span>${task.title}</span>
      <span>${task.deadline} ${task.time}</span>
      <span class="priority-badge priority-${task.priority}">${getPriorityText(task.priority)}</span>
      <div>
        <button onclick="toggleComplete(${task.id})">${task.is_complete == 1 ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>`;
    list.appendChild(li);

    // Count completed and pending tasks
    if (task.is_complete) completedCount++;
    else pendingCount++;
  });

  // Update task statistics
  document.getElementById('totalTasks').textContent = tasks.length;
  document.getElementById('completedTasks').textContent = completedCount;
  document.getElementById('pendingTasks').textContent = pendingCount;

  // Show empty state message if no tasks are available
  document.getElementById('emptyState').style.display = tasks.length === 0 ? 'block' : 'none';
}

// Helper function to display priority text
function getPriorityText(priority) {
  switch (priority) {
    case 1: return 'High';
    case 2: return 'Medium';
    case 3: return 'Low';
    default: return '';
  }
}

// Toggle the completion status of a task
async function toggleComplete(id) {
  await fetch('toggle_task.php?id=' + id);
  loadTasks(); // Reload tasks after updating completion status
}

// Delete a task from the database
async function deleteTask(id) {
  await fetch('delete_task.php?id=' + id);
  loadTasks(); // Reload tasks after deletion
}

// Filter tasks by selected priority
function filterTasks() {
  currentFilter = document.getElementById('categoryFilter').value;
  loadTasks(); // Reload tasks after applying filter
}

// Toggle sorting of tasks by deadline (ascending or descending)
function toggleSort() {
  sortByDeadlineAsc = !sortByDeadlineAsc;
  loadTasks(); // Reload tasks after changing sort order
}

// Initialize the task list on page load
window.onload = loadTasks;
