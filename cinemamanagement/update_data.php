<?php
// update_data.php

// Get table, columns, and primary key from URL
$table = $_GET['table'];
$columns = $_GET['columns'];
$primary_key = $_GET['primary_key'];

// Split columns and values into arrays
$columnArray = explode(',', $columns);
$valueArray = $_POST;

// Remove table, columns, and primary key from values
unset($valueArray['table']);
unset($valueArray['columns']);
unset($valueArray[$primary_key]);

// Connect to the database
include 'connect.php';

// Update data in the specified table
$setString = '';
$types = '';
$bindParams = [];
foreach ($columnArray as $index => $column) {
    $setString .= "$column = ?,";
    $value = $valueArray[$column];
    switch (true) {
        case is_int($value):
            $types .= 'i';
            $bindParams[] = intval($value);
            break;
        case is_float($value):
            $types .= 'd';
            $bindParams[] = floatval($value);
            break;
        case is_string($value):
            $types .= 's';
            $bindParams[] = $value;
            break;
        default:
            $types .= 'b'; // Use 'b' for blob data type or any other data type that might not be handled by the above cases
            $bindParams[] = $value;
            break;
    }
}
$setString = rtrim($setString, ',');

$sql = "UPDATE $table SET $setString WHERE $primary_key = ?";

$stmt = $conn->prepare($sql);

// Bind values to the statement
$types .= 'i'; // add 'i' for primary key
$bindParams[] = $_POST[$primary_key]; // add primary key value to bindParams
$stmt->bind_param($types, ...$bindParams);

if ($stmt->execute()) {
    echo "Data updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close statement and connection
$stmt->close();
mysqli_close($conn);
?>