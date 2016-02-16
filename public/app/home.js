angular.module('home', ['ngRoute'])

.controller('homeCtrl', ['$scope', '$http', ($scope, $http) => {

  $scope.hello = "hello";
}]);
