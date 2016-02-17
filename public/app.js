var app = angular.module('app', ['ngRoute', 'home', 'category', 'product', 'search', 'cart']);

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider.when('/', {
    title: 'Home',
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  }).when('/category/:category/:type?', {
    title: 'Category',
    templateUrl: 'views/category.html',
    controller: 'categoryCtrl'
  }).when('/product/:productID', {
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

app.controller('commonCtrl', ['$location', '$scope', '$http', ($location, $scope, $http) => {
  $scope.term;

  $scope.results = () => {
    var req = {
      method: 'GET',
      url: 'http://localhost:5000/live-search',
      params: {
        term: $scope.term
      }
    };

    $http(req).then((res) => {
      $scope.data = res.data;
      console.log($scope.data);
    });
  }

  $scope.go = (path) => {
    $location.path(path + "/" + $scope.term);
  };
}])

app.run(['$rootScope', ($rootScope) => {
  $rootScope.$on('$routeChangeSuccess', (event, curr, prev) => {
    $rootScope.title = curr.$$route.title;
  })
}]);
