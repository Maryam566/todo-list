<?php

class Connection
{
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "todo_list";

    public $connection = null;

    public function __construct()
    {
        $this->connection = mysqli_connect(
            $this->host,
            $this->username,
            $this->password,
            $this->database
        );

        if (!$this->connection) {
            die("Database connection failed: " . mysqli_connect_error());
        }
    }
}