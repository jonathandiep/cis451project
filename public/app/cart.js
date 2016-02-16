angular.module('cart', ['ngRoute'])

.controller('cartCtrl', ['$scope', function($scope) {
  $scope.cart = 0;
}]);
