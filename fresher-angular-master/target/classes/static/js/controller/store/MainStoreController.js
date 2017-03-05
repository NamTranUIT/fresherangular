var app = angular.module('myApp');
app.directive("productList", function(){
	return{
		templateUrl: "/fresherangular/views/store/productlist.html"
	};
});

app.controller('MainStoreController',function($scope, $http){

	$scope.addProduct = function(){
		
		$scope.product = {
			
			name: $scope.Name,
			model: $scope.Model,
			year: $scope.Year,
			price: $scope.Price,
			producer: $scope.Producer,
			available: $scope.Available
		};
		
		$http.post("http://localhost:9000/fresherangular/product/add", $scope.product)
	    .success(function() {
	    	
	    	$scope.Name = "";
	    	$scope.Model = "";
			$scope.Year = "";
			$scope.Price = "";
			$scope.Producer = "";
			$scope.Available = "";
			
			$http.get("http://localhost:9000/fresherangular/product/list")
		    .success(function(data) {
		        $scope.products = data;
		    }).error(function(){
		    	console.log("error");
		    });
	    }).error(function(){
	    	console.log("error");
	    });
	};
	
	
	$http.get("http://localhost:9000/fresherangular/product/list")
    .success(function(data) {
        $scope.products = data;
    }).error(function(){
    	console.log("Error");
    });
	
	
	$scope.plusItem = function(productId) {
		$http.get("http://localhost:9000/fresherangular/product/increase/"+productId)
		.success(function(response){
			$http.get("http://localhost:9000/fresherangular/product/list")
			.success(function(data, status, headers, config){
				$scope.products = data;
			}).error(function(data, status, headers, config){});
		}).error(function(response){
			console.log("Error");
	});
	};
		
	$scope.minusItem = function(productId) {
		$http.get("http://localhost:9000/fresherangular/product/decrease/"+productId)
		.success(function(response){
			$http.get("http://localhost:9000/fresherangular/product/list")
			.success(function(data, status, headers, config){
				$scope.products = data;
			}).error(function(data, status, headers, config){});
		}).error(function(response){
			console.log("Error");
	});

	};
	$scope.removeItem = function(productId) {
			$scope.products.splice( $scope.products.indexOf(productId), 1 );
	};
		

});
app.controller('ProductDetailController',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
	$http.get("http://localhost:9000/fresherangular/product/get/" + $routeParams.id)
    .success(function(data) {
         $scope.productDetail = data;
         console.log(data);
    }).error(function(){
    	console.log("Error");
    });
}]);

app.run(['$window', '$rootScope', 
         function ($window ,  $rootScope) {
           $rootScope.Back = function(){
             $window.history.back();
           };
}]);