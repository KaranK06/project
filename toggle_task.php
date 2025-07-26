<?php
// Toggle task completion status
$id = $_GET['id'];

// Update task status in the database
$sql = "UPDATE tasks SET is_complete = NOT is_complete WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo "Task updated successfully!";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
