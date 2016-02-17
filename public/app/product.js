angular.module('product', ['ngRoute'])

.controller('productCtrl', ['$scope', '$http', '$routeParams', ($scope, $http, $routeParams) => {
  $scope.productID = $routeParams.productID;

   var req1 = {
     method: 'GET',
     url: 'http://localhost:5000/product-detail',
     params: {
       id: $scope.productID
     }
   };

   $http(req1).then((res) => {
     $scope.product = res.data[0];
     var req2 = {
       method: 'GET',
       url: 'http://localhost:5000/category-names',
       params: {
         id: $scope.product.categoryID
       }
     };
     $http(req2).then((ress) => {
       $scope.categories = ress.data[0];
     })
   });


}]);
