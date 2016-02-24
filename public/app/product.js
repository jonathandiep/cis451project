angular.module('product', ['ngRoute'])

.controller('productCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$location', 'cartService', ($scope, $rootScope, $http, $routeParams, $location, cartService) => {
  $scope.productID = $routeParams.productID;
  $scope.quantity = 1;

   var req1 = {
     method: 'GET',
     url: 'http://localhost:5000/product-detail',
     params: {
       id: $scope.productID
     }
   };

   $http(req1).then(res => {
     $scope.product = res.data[0];
     var req2 = {
       method: 'GET',
       url: 'http://localhost:5000/category-names',
       params: {
         id: $scope.product.categoryID
       }
     };
     $http(req2).then(ress => {
       $scope.categories = ress.data[0];
     })
   });

   $scope.addToCart = (product) => {
     var req3 = {
       method: 'GET',
       url: 'http://localhost:5000/add-to-cart',
       params: {
         id: product.productID,
         name: product.productName,
         price: product.productPrice,
         quantity: $scope.quantity
       }
     };
     $http(req3).then(res => {
       $rootScope.cart = cartService.getCount();
       $location.path('/cart');
     });
   };

}]);
