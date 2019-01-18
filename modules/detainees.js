angular.module('app-module', ['bootstrap-modal','ui.bootstrap','block-ui','bootstrap-growl','snapshot-module']).factory('app', function($http,$timeout,$compile,bui,growl,bootstrapModal,snapshot) {

	function app() {

		var self = this;				

		self.data = function(scope) {

			scope.formHolder = {};

			scope.btns = {
				ok: { btn: false, label: 'Save'},
				cancel: { btn: false, label: 'Cancel'},
			};

			scope.detainee = {};
			scope.detainee.id = 0;			
			
			scope.detainees = [];
			
		};
		
		self.list = function(scope) {
			
			bui.show();
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			scope.detainee = {};
			scope.detainee.id = 0;						
			
			$http({
			  method: 'POST',
			  url: 'handlers/detainees/list.php'
			}).then(function success(response) {
				
				scope.detainees = angular.copy(response.data);
				
				bui.hide();
				
			}, function error(response) {
				
				bui.hide();

			});			
			
			$('#content').load('lists/detainees.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); }, 500);
			});			
			
		};
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.btns.ok.label = 'Save';
				scope.btns.ok.btn = false;
				scope.btns.cancel.label = 'Cancel';
				scope.btns.cancel.btn = false;
			} else {
				scope.btns.ok.label = 'Update';
				scope.btns.cancel.label = 'Close';
				scope.btns.ok.btn = true;
			}
			
		};	
		
	};
	
	return new app();
	
});