<?php
include 'connect.php';

// Check if table name is provided
if (isset($_GET['table'])) {
    $table = $_GET['table'];

    // Query to select all data from the provided table
    $sql = "SELECT * FROM $table";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        $data = array();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data); // Return data as JSON
    } else {
        echo "0 results";
    }

    $conn->close();
} else {
    echo "Table name not provided";
}
?>