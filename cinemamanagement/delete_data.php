<?php
// delete_data.php

// Get table and primary key from URL
$table = $_GET['table'];
$primary_key = $_GET['primary_key'];

// Connect to the database
include 'connect.php';

// Delete data in the specified table
$sql = "DELETE FROM $table WHERE $primary_key = ?";

$stmt = $conn->prepare($sql);

// Bind values to the statement
$types = 'i'; // add 'i' for primary key
$bindParams[] = $_POST[$primary_key]; // add primary key value to bindParams
$stmt->bind_param($types, ...$bindParams);

if ($stmt->execute()) {
    echo "Data deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close statement and connection
$stmt->close();
mysqli_close($conn);
?>