<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$detainees = $con->getData("SELECT  id, CONCAT(firstname,' ',lastname) fullname FROM detainees");

header("Content-Type: application/json");
echo json_encode($detainees);

?>