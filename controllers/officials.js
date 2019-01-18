var app = angular.module('officials',['account-module','app-module']);

app.controller('officialsCtrl',function($scope,app) {
	
	$scope.formHolder = {};
	$scope.app = app;

	app.data($scope);
	app.list($scope);
	
});

