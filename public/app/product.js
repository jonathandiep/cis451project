angular.module('product', ['ngRoute'])

.controller('productCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.productid = $routeParams.productid;

   var req1 = {
     method: 'GET',
     url: 'http://localhost:5000/product-detail',
     params: {
       id: $scope.productid
     }
   };



   $http(req1).then(function(res) {
     $scope.product = res.data[0];
     console.log($scope.product);
     var req2 = {
       method: 'GET',
       url: 'http://localhost:5000/category-names',
       params: {
         id: $scope.product.categoryid
       }
     };
     $http(req2).then(function(ress) {
       $scope.categories = ress.data[0];
       console.log($scope.categories);
     })
   });


}]);
