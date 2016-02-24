angular.module('search', ['ngRoute'])

.controller('searchCtrl', ['$scope', '$http', '$routeParams', ($scope, $http, $routeParams) => {
  $scope.term = $routeParams.term;

  var req = {
    method: 'GET',
    url: 'http://localhost:5000/search-products',
    params: {
      term: $scope.term
    }
  };

  $http(req).then(res => {
    $scope.results = res.data;
  });

}]);
