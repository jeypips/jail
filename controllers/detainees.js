var app = angular.module('detainees',['account-module','app-module']);

app.controller('detaineesCtrl',function($scope,app) {
	
	$scope.formHolder = {};
	$scope.app = app;

	app.data($scope);
	app.list($scope);
	
});

