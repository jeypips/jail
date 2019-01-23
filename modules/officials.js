angular.module('app-module', ['bootstrap-modal','ui.bootstrap','block-ui','bootstrap-growl','bootstrap-modal','form-validator','window-open-post']).factory('app', function($http,$timeout,$compile,bui,growl,bootstrapModal,validate,printPost) {

	function app() {

		var self = this;				

		self.data = function(scope) {

			scope.formHolder = {};
			
			scope.btns = {
				ok: { btn: false, label: 'Save'},
				cancel: { btn: false, label: 'Cancel'},
			};

			scope.official = {};
			scope.official.id = 0;			
			
			scope.officials = [];
			
		};
		
		function positions(scope) {
			
			$http({
				method: 'POST',
				url: 'api/suggestions/positions.php'
			}).then(function mySucces(response) {
				
				scope.positions = response.data;
				
			},function myError(response) {
				
			});	
			
		};
		
		self.list = function(scope) {
			
			bui.show();
			
			if (scope.$id > 2) scope = scope.$parent;			

			scope.official = {};
			scope.official.id = 0;						
			
			$http({
			  method: 'POST',
			  url: 'handlers/officials/list.php'
			}).then(function success(response) {
				
				scope.officials = angular.copy(response.data);

				bui.hide();
				
			}, function error(response) {
				
				bui.hide();

			});			
			
			$('#content').load('lists/officials.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#officials').DataTable({
						"ordering": false
					});	
				},200);
				
			});					
			
		};
		
		self.add = function(scope,row) { //add
			
			// bui.show();
			
			title = "Form";
			
			scope.official = {};
			scope.official.id = 0;
			positions(scope);
			
			mode(scope,row);

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;	
				
				$http({
				  method: 'POST',
				  url: 'handlers/officials/view.php',
				  data: {id: row.id}
				}).then(function success(response) {
					
					scope.official = angular.copy(response.data);
					
					bui.hide();
					
				}, function error(response) {
					
					bui.hide();				
					
				});
			};
			
			bootstrapModal.box(scope,title,'dialogs/official.html');
			
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
			};
			
		};

		
	};
	
	return new app();
	
});