angular.module('search', ['ngRoute'])

.controller('searchCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.term = $routeParams.term;

  var req = {
    method: 'GET',
    url: 'http://localhost:5000/search-products',
    params: {
      term: $scope.term
    }
  };

  $http(req).then(function(res) {
    $scope.results = res.data;
    console.log($scope.results);
  });

}]);
