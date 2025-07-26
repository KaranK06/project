<?php
// Assuming you're already connected to MySQL

$title = $_POST['title'];
$deadline = $_POST['deadline'];
$time = $_POST['time'];
$priority = $_POST['priority'];

// Default status for new tasks is "Pending" (is_complete = 0)
$is_complete = 0;

// Insert the task into the database
$sql = "INSERT INTO tasks (title, deadline, time, priority, is_complete) VALUES ('$title', '$deadline', '$time', '$priority', '$is_complete')";
if (mysqli_query($conn, $sql)) {
    echo "Task added successfully!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>
