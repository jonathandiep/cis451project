angular.module('home', ['ngRoute'])

.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.hello = "hello";
  $scope.cart = " ";
}]);
