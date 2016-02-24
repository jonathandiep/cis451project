angular.module('category', ['ngRoute'])

.controller('categoryCtrl', ['$scope', '$http', '$routeParams', ($scope, $http, $routeParams) => {
  $scope.category = $routeParams.category;
  $scope.type = $routeParams.type;

  var req1 = {
    method: 'GET',
    url: 'http://localhost:5000/product-in-categories'
  };

  if ($scope.type) {
    req1.params = {
      category: $scope.category,
      type: $scope.type
    }
  } else {
    req1.params = {
      category: $scope.category
    }
  }

  $http(req1).then(res => {
    $scope.products = res.data;
  })

  var req2 = {
    method: 'GET',
    url: 'http://localhost:5000/category-list',
    params: {
      parent: $scope.category
    }
  };

  $http(req2).then(res => {
    $scope.list = res.data;
  })

}]);
