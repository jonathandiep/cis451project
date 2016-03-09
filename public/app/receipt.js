angular.module('receipt', ['ngRoute'])

.controller('receiptCtrl', ['$scope', '$cookies', '$http', '$route', ($scope, $cookies, $http, $route) => {
  $scope.subtotal = 0;
  $scope.tax = 0;
  $scope.total = 0;
  // make a call to grab all cart items (use the cookie)
  // HTTP GET => /cart-items
  var req1 = {
    method: 'GET',
    url: 'http://localhost:5000/cart-items'
  };

  $http(req1).then((res) => {
    $scope.products = res.data;
    var products = res.data;

    for (var i = 0; i < $scope.products.length; i++) {
      var qty = $scope.products[i].quantity;
      var price = $scope.products[i].price;
      $scope.subtotal += qty * price;
    }
    var req2 = {
      method: 'GET',
      url: 'http://localhost:5000/get-user-info'
    };

    $http(req2).then((res) => {
      $scope.userInfo = res.data;
      var userInfo = res.data[0];
      if (userInfo.state === 'CA') {
        $scope.tax = $scope.subtotal * 0.0875;
      }
      $scope.total = $scope.subtotal + $scope.tax;

      var req3 = {
        method: 'GET',
        url: 'http://localhost:5000/send-receipt',
        params: {
          products: JSON.stringify(products),
          userInfo: JSON.stringify(userInfo),
          subtotal: $scope.subtotal,
          tax: $scope.tax,
          total: $scope.total
        }
      };

      $http(req3).then((res) => {

      })

      $cookies.remove('cookieName');
    })
  })


}]);
