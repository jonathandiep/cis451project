var app = angular.module('app', ['ngRoute', 'home', 'category', 'product', 'search', 'cart']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    title: 'Home',
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  }).when('/category/:category/:type?', {
    title: 'Category',
    templateUrl: 'views/category.html',
    controller: 'categoryCtrl'
  }).when('/product/:productid', {
    title: 'Product',
    templateUrl: 'views/product.html',
    controller: 'productCtrl'
  }).when('/search/:term', {
    title: 'Search',
    templateUrl: 'views/search.html',
    controller: 'searchCtrl'
  }).when('/cart', {
    title: 'Cart',
    templateUrl: 'views/cart.html',
    controller: 'cartCtrl'
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

}]);

app.controller('commonCtrl', ['$location', '$scope', '$http', function($location, $scope, $http) {
  $scope.term;

  $scope.results = function() {
    var req = {
      method: 'GET',
      url: 'http://localhost:5000/live-search',
      params: {
        term: $scope.term
      }
    };

    $http(req).then(function(res) {
      $scope.data = res.data;
      console.log($scope.data);
    });
  }

  $scope.go = function(path) {
    $location.path(path + "/" + $scope.term);
  };
}])

app.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function(event, curr, prev) {
    $rootScope.title = curr.$$route.title;
  })
}]);
