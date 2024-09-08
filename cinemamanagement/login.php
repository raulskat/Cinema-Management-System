<?php
//login.php
include 'connect.php';

$manager_id = $_POST['manager_id'];
$manager_name = $_POST['manager_name'];

$sql = "SELECT * FROM manager WHERE manager_id = ? AND manager_name = ?";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die('Error preparing statement: ' . $conn->error);
}

$stmt->bind_param("is", $manager_id, $manager_name);
if ($stmt->execute() === false) {
    die('Error executing statement: ' . $stmt->error);
}

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    header("Location: management.html");
} else {
    echo "Invalid manager id or name.";
}

$stmt->close();
$conn->close();
?>