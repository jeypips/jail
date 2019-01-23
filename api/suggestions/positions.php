<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$positions = $con->getData("SELECT position_id, position_description FROM positions");

header("Content-Type: application/json");
echo json_encode($positions);

?>