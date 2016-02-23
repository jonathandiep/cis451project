angular.module('cart', ['ngRoute', 'ngCookies'])

.controller('cartCtrl', ['$scope', '$cookies', '$http', ($scope, $cookies, $http) => {
  $scope.cart = 0;

  console.log('cookie name: ' + $cookies.get('cookieName'));
  var req = {
    method: 'GET',
    url: 'http://localhost:5000/cart-items'
  };

  $http(req).then(res => {
    $scope.cartProducts = res.data;
    console.log($scope.cartProducts);
  })

}]);

/*

var req = {
  method: 'GET',
  url: 'http://localhost:5000/search-products',
  params: {
    term: $scope.term
  }
};

$http(req).then((res) => {
  $scope.results = res.data;
});

*/
