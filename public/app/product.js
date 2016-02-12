angular.module('product', ['ngRoute'])

.controller('productCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.productid = $routeParams.productid;
}]);

/*
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
*/
