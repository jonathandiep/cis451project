var app = angular.module('app', ['ngRoute', 'home', 'category', 'product', 'search']);

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
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

}]);

app.controller('commonCtrl', ['$location', '$scope', function($location, $scope) {
  $scope.term;

  $scope.go = function(path) {
    $location.path(path + "/" + $scope.term);
  };
}])

app.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function(event, curr, prev) {
    $rootScope.title = curr.$$route.title;
  })
}]);
