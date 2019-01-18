<?php

require_once '../../../db.php';
// require_once '../../../system_privileges.php';
// require_once '../../../classes.php';

session_start();

if (!isset($_SESSION['id'])) header('X-Error-Message: Session timeout', true, 500);

$con = new pdo_db("users");

$account = $con->get(["id"=>$_SESSION['id']],["official_id"]);

$official = $con->getData("SELECT id, CONCAT(firstname, ' ',lastname) fullname FROM officials WHERE id = ".$account[0]['official_id']);
$account[0]['fullname'] = $official[0];

$avatar = "angular/modules/account/avatar.png";

/* $con->table = "groups";

$group_privileges = $con->get(array("group_id"=>$account[0]['groups']),["privileges"]);

$pages_access = [];
if (count($group_privileges)) {
	if ($group_privileges[0]['privileges']!=NULL) {

		$privileges_obj = new privileges(system_privileges,$group_privileges[0]['privileges']);
		$pages_access = $privileges_obj->getPagesPrivileges();

	};
} */

// $account[0]['pages_access'] = $pages_access;

$profile = array(
	// "fullname"=>$account[0]['fullname'],
	"picture"=>$avatar,
	"fullname"=>$official[0]['fullname'],
	// "groups"=>$account[0]['groups'],
	// "pages_access"=>$pages_access,
);

echo json_encode($profile);

?>