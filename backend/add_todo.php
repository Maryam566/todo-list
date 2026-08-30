<?php

require_once "Loader.php";

$task = $_POST["task"] ?? "";
$priority = $_POST["priority"] ?? "";
$file=$_FILES["file"] ?? "";
if($file["error"]!=0){
    echo " no file selected";
    exit;
}

if (empty($task) || empty($priority)) {
    echo "Task and priority are required";
    exit;
}
$extension = pathinfo($file["name"], PATHINFO_EXTENSION);
$allowedExtensions = [
    "pdf",
    "doc",
    "docx",
    "zip"
];
$uniqueName = uniqid() . "_" . $file["name"];
if (!in_array($extension, $allowedExtensions)) {
    echo "File type not allowed";
    exit;
}
$maxSize = 10* 1024 * 1024;
if ($file["size"] > $maxSize) {
    echo "File size is too large";
    exit;
}if (!move_uploaded_file($file["tmp_name"], "uploads/".$uniqueName)) {
    echo "File upload failed";
    exit;
}
$todo = new Todo();

$todo->task = $task;
$todo->priority = $priority;
$todo->file = "uploads/" . $uniqueName;

if ($todo->save()) {
    echo "Task added successfully";
} else {
    echo "Unable to add task";
}

?>