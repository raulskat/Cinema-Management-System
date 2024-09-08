function crudOperation(url, formId, tableId, successCallback) {
    // Get form data
    var formData = new FormData($(formId)[0]);

    // Get table and columns from URL
    var table = new URLSearchParams(window.location.search).get('table');
    var columns = new URLSearchParams(window.location.search).get('columns');

    // Append table and columns to form data
    formData.append('table', table);
    formData.append('columns', columns);
    // AJAX request
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            alert(response); // Show success or error message
            successCallback(tableId); // Refresh the table
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}
// Function to show data for a given table
function showTableData(tableId, url) {
    // AJAX request to get data from server
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            // Parse JSON response
            var data = JSON.parse(response);
            // Create HTML table
            var table = "<table border='1'><tr>";
            // Add table headers based on the first object in the data array
            for (var key in data[0]) {
                table += "<th>" + key + "</th>";
            }
            table += "</tr>";
            // Add data to table
            for (var i = 0; i < data.length; i++) {
                table += "<tr>";
                for (var key in data[i]) {
                    table += "<td>" + data[i][key] + "</td>";
                }
                table += "</tr>";
            }
            // Display table in a div with the given id
            document.getElementById(tableId).innerHTML = table;
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function generateFormFields(tableName, columns) {
    let form = document.createElement('form');
    form.id = 'addForm';

    columns.forEach(column => {
        let div = document.createElement('div');
        div.className = 'form-group';

        let label = document.createElement('label');
        label.htmlFor = column.name;
        label.textContent = column.label;

        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.id = column.name;
        input.name = column.name;

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });

    let submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'btn btn-success';
    submitButton.textContent = 'Add Record';
    submitButton.onclick = function() { addRecord(tableName); };
    form.appendChild(submitButton);

    return form;
}
function openAddModal(tableName, columns) {
    let modalBody = document.getElementById('addModalBody');
    modalBody.innerHTML = '';

    let form = generateFormFields(tableName, columns);
    modalBody.appendChild(form);

    $('#addModal').modal('show');
}
function addCinema() {
    crudOperation("add_data.php?table=cinema&columns=Cinema_id,CName,Location,Capacity", '#addCinemaForm', "cinemaData", showCinemaData);
}

function updateCinema() {
    crudOperation("update_data.php?table=cinema&columns=CName,Location,Capacity&primary_key=Cinema_id", '#updateCinemaForm', "cinemaData", showCinemaData);
}

function deleteCinema() {
    crudOperation("delete_data.php?table=Cinema&primary_key=Cinema_id", '#deleteCinemaForm', "cinemaData", showCinemaData);
}
function addOperator() {
    crudOperation("add_data.php?table=Operator&columns=Op_id,Op_name,city,state,pincode,street,Cinema_id", '#addOperatorForm', "operatorData", showOperatorData);
}

function updateOperator() {
    crudOperation("update_data.php?table=Operator&columns=Op_name,city,state,pincode,street&primary_key=Op_id", '#updateOperatorForm', "operatorData", showOperatorData);
}

function deleteOperator() {
    crudOperation("delete_data.php?table=Operator&primary_key=Op_id", '#deleteOperatorForm', "operatorData", showOperatorData);
}
function addMovie() {
    crudOperation("add_data.php?table=Movie&columns=Movie_id,Description,Title,Release_date", '#addMovieForm', "movieData", showMovieData);
}

function updateMovie() {
    crudOperation("update_data.php?table=Movie&columns=Description,Title,Release_date&primary_key=Movie_id", '#updateMovieForm', "movieData", showMovieData);
}

function deleteMovie() {
    crudOperation("delete_data.php?table=Movie&primary_key=Movie_id", '#deleteMovieForm', "movieData", showMovieData);
}
function addReservation() {
    crudOperation("add_data.php?table=Reservation&columns=Reservation_id,date,No_of_people,Customer_id,Cinema_id", '#addReservationForm', "reservationData", showReservationData);
}

function updateReservation() {
    crudOperation("update_data.php?table=Reservation&columns=date,No_of_people&primary_key=Reservation_id", '#updateReservationForm', "reservationData", showReservationData);
}

function deleteReservation() {
    crudOperation("delete_data.php?table=Reservation&primary_key=Reservation_id", '#deleteReservationForm', "reservationData", showReservationData);
}
function addCustomer() {
    crudOperation("add_data.php?table=Customer&columns=Customer_id,Customer_Name,Customer_Age,Customer_Phone", '#addCustomerForm', "customerData", showCustomerData);
}

function updateCustomer() {
    crudOperation("update_data.php?table=Customer&columns=Customer_Name,Customer_Age,Customer_Phone&primary_key=Customer_id", '#updateCustomerForm', "customerData", showCustomerData);
}

function deleteCustomer() {
    crudOperation("delete_data.php?table=Customer&primary_key=Customer_id", '#deleteCustomerForm', "customerData", showCustomerData);
}
function addScreen() {
    crudOperation("add_data.php?table=Screen&columns=Screen_id,Type,Seat_no,Cinema_id", '#addScreenForm', "screenData", showScreenData);
}

function updateScreen() {
    crudOperation("update_data.php?table=Screen&columns=Type,Seat_no&primary_key=Screen_id", '#updateScreenForm', "screenData", showScreenData);
}

function deleteScreen() {
    crudOperation("delete_data.php?table=Screen&primary_key=Screen_id", '#deleteScreenForm', "screenData", showScreenData);
}
function addGenre() {
    crudOperation("add_data.php?table=Genre&columns=Genre_id,Genre_name,Type", '#addGenreForm', "genreData", showGenreData);
}

function updateGenre() {
    crudOperation("update_data.php?table=Genre&columns=Genre_name,Type&primary_key=Genre_id", '#updateGenreForm', "genreData", showGenreData);
}

function deleteGenre() {
    crudOperation("delete_data.php?table=Genre&primary_key=Genre_id", '#deleteGenreForm', "genreData", showGenreData);
}

function addManager() {
    crudOperation("add_data.php?table=Manager&columns=Manager_id,Manager_name,city,state,pincode,street,Cinema_id", '#addManagerForm', "managerData", showManagerData);
}

function updateManager() {
    crudOperation("update_data.php?table=Manager&columns=Manager_name,city,state,pincode,street&primary_key=Manager_id", '#updateManagerForm', "managerData", showManagerData);
}

function deleteManager() {
    crudOperation("delete_data.php?table=Manager&primary_key=Manager_id", '#deleteManagerForm', "managerData", showManagerData);
}

function addTechnician() {
    crudOperation("add_data.php?table=Technician&columns=Tech_id,Tech_name,city,state,pincode,street,Cinema_id", '#addTechnicianForm', "technicianData", showTechnicianData);
}

function updateTechnician() {
    crudOperation("update_data.php?table=Technician&columns=Tech_name,city,state,pincode,street&primary_key=Tech_id", '#updateTechnicianForm', "technicianData", showTechnicianData);
}

function deleteTechnician() {
    crudOperation("delete_data.php?table=Technician&primary_key=Tech_id", '#deleteTechnicianForm', "technicianData", showTechnicianData);
}
function addVendor() {
    crudOperation("add_data.php?table=Vendor&columns=V_id,V_name,Cinema_id", '#addVendorForm', "vendorData", showVendorData);
}

function updateVendor() {
    crudOperation("update_data.php?table=Vendor&columns=V_name,Cinema_id&primary_key=V_id", '#updateVendorForm', "vendorData", showVendorData);
}

function deleteVendor() {
    crudOperation("delete_data.php?table=Vendor&primary_key=V_id", '#deleteVendorForm', "vendorData", showVendorData);
}
function addShowtime() {
    crudOperation("add_data.php?table=Showtime&columns=Show_id,Language,Duration,Start_time,End_time", '#addShowtimeForm', "showtimeData", showShowtimeData);
}

function updateShowtime() {
    crudOperation("update_data.php?table=Showtime&columns=Language,Duration,Start_time,End_time&primary_key=Show_id", '#updateShowtimeForm', "showtimeData", showShowtimeData);
}

function deleteShowtime() {
    crudOperation("delete_data.php?table=Showtime&primary_key=Show_id", '#deleteShowtimeForm', "showtimeData", showShowtimeData);
}
// Function to show cinema data
function showCinemaData() {
    showTableData("cinemaData", "get_data.php?table=cinema");
}

// Function to show operator data
function showOperatorData() {
    showTableData("operatorData", "get_data.php?table=Operator");
}

// Function to show movie data
function showMovieData() {
    showTableData("movieData", "get_data.php?table=Movie");
}
// Function to show screen data
function showScreenData() {
    showTableData("screenData", "get_data.php?table=screen");
}

// Function to show reservation data
function showReservationData() {
    showTableData("reservationData", "get_data.php?table=reservation");
}

// Function to show customer data
function showCustomerData() {
    showTableData("customerData", "get_data.php?table=customer");
}

// Function to show genre data
function showGenreData() {
    showTableData("genreData", "get_data.php?table=genre");
}
// Function to show manager data
function showManagerData() {
    showTableData("managerData", "get_data.php?table=Manager");
}

// Function to show technician data
function showTechnicianData() {
    showTableData("technicianData", "get_data.php?table=technician");
}

// Function to show vendor data
function showVendorData() {
    showTableData("vendorData", "get_data.php?table=vendor");
}

// Function to show showtime data
function showShowtimeData() {
    showTableData("showtimeData", "get_data.php?table=showtime");
}

// Function to show transaction data
function showTransactionData() {
    showTableData("transactionData", "get_data.php?table=transaction");
}

// Function to show loyalty program data
function showLoyaltyProgramData() {
    showTableData("loyaltyProgramData", "get_data.php?table=loyalty_program");
}

// Function to show rating data
function showRatingData() {
    showTableData("ratingData", "get_data.php?table=Rating");
}

function searchTables() {
// Get the search input value
var searchInput = document.getElementById("searchInput").value.toLowerCase();

// Get all tables in the document
var tables = document.getElementsByTagName("table");

// Loop through each table
for (var i = 0; i < tables.length; i++) {
// Get all rows of the table
var rows = tables[i].getElementsByTagName("tr");

// Loop through each row
for (var j = 1; j < rows.length; j++) {
// Get all columns of the row
var columns = rows[j].getElementsByTagName("td");

// Initialize a flag to check if any column matches the search input
var match = false;

// Loop through each column
for (var k = 0; k < columns.length; k++) {
// Check if the column text matches the search input
if (columns[k].innerText.toLowerCase().includes(searchInput)) {
  match = true;
  break;
}
}

// Show or hide the row based on whether it matches the search input
if (match) {
rows[j].style.display = "";
} else {
rows[j].style.display = "none";
}
}
}
}