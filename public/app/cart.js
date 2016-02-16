angular.module('cart', ['ngRoute'])

.controller('cartCtrl', ['$scope', ($scope) => {
  $scope.cart = 0;
}]);
