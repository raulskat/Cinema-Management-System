<?php
// adddata.php

// Get table and columns from URL
$table = $_GET['table'];
$columns = $_GET['columns'];

// Split columns into an array
$columnArray = explode(',', $columns);

// Get values from POST request
$values = $_POST;

// Remove table and columns from values
unset($values['table']);
unset($values['columns']);

// Connect to the database
include 'connect.php';

// Insert data into the specified table
$columnsString = implode(',', $columnArray);
$placeholders = rtrim(str_repeat('?,', count($columnArray)), ',');

$sql = "INSERT INTO $table ($columnsString) VALUES ($placeholders)";

$stmt = $conn->prepare($sql);

// Bind values to the statement
$types = str_repeat('s', count($values));
$stmt->bind_param($types, ...array_values($values));

if ($stmt->execute()) {
    echo "New data added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close statement and connection
$stmt->close();
mysqli_close($conn);