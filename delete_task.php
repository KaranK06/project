<?php
// Delete task by id
$id = $_GET['id'];

$sql = "DELETE FROM tasks WHERE id = $id";

if (mysqli_query($conn, $sql)) {
    echo "Task deleted successfully!";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
