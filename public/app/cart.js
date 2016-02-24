angular.module('cart', ['ngRoute', 'ngCookies'])

.controller('cartCtrl', ['$scope', '$rootScope', '$cookies', '$http', '$route', 'cartService', ($scope, $rootScope, $cookies, $http, $route, cartService) => {
  $rootScope.cart;
  $scope.updateVar = false;


  $scope.toggleOnce = () => {
    $scope.updateVar = true;
  }

  $scope.productQtyPrice = (product) => {
    return product.quantity * product.price;
  };

  var req1 = {
    method: 'GET',
    url: 'http://localhost:5000/cart-items'
  };

  $http(req1).then(res => {
    $scope.cartProducts = res.data;
    cartService.setCount($scope.cartProducts.length);
    $scope.updateCart();
  })

  $scope.updateCart = () => {
    $rootScope.cart = cartService.getCount();
  }

  $scope.updateQty = (product) => {
    var req2 = {
      method: 'GET',
      url: 'http://localhost:5000/add-to-cart',
      params: {
        id: product.productID,
        name: product.productName,
        price: product.productPrice,
        quantity: product.quantity
      }
    };
    $http(req2).then(res => {
      $route.reload();
    })
  };

  $scope.deleteFromCart = (productID) => {
    var req3 = {
      method: 'GET',
      url: 'http://localhost:5000/delete-from-cart',
      params: {
        productID: productID
      }
    };
    $http(req3).then(res => {
      $route.reload();
    })
  };

  $scope.clearCart = () => {
    var req4 = {
      method: 'GET',
      url: 'http://localhost:5000/clear-cart'
    };
    $http(req4).then(res => {
      $rootScope.cart = cartService.getCount();
      $route.reload();
    })
  }

}])

.service('cartService', () => {
  var count;

  var setCount = (num) => {
    count = num;
  }

  var getCount = () => {
    return count;
  }

  return {
    setCount: setCount,
    getCount: getCount
  }
});
