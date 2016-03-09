angular.module('checkout', ['ngRoute'])

.controller('checkoutCtrl', ['$scope', '$http', '$location', ($scope, $http, $location) => {

  $scope.submit = () => {
    var req = {
      method: 'GET',
      url: 'http://localhost:5000/user-info-to-database',
      params: {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        address: $scope.address,
        city: $scope.city,
        state: $scope.state,
        zip: $scope.zip,
        email: $scope.email,
        phoneNumber: $scope.phoneNumber,
        cardNum: $scope.cardNum,
        cardType: $scope.cardType,
        cardExpDate: $scope.cardExpDate
      }
    };
    $http(req).then((res) => {
      $location.path('/receipt');
    })
  }
}]);
