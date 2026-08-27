<?php
require_once "Loader.php";

$todos = Todo::all();

header("Content-Type: application/json");

echo json_encode($todos);

?>