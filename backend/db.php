
<?php
$connection=mysqli_connect(
    "localhost",
    "root",
    "",
    "todo_list"
);
if(!$connection){
        die("Database connection failed: " . mysqli_connect_error());
}
?>