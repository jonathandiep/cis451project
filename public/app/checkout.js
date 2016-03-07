angular.module('checkout', ['ngRoute'])

.controller('checkoutCtrl', ['$scope', '$http', '$cookies', ($scope, $http, $cookies) => {
  var cookie = $cookies.get('cookieName');

  $scope.submit = () => {
    var req = {
      method: 'GET',
      url: 'http://localhost:5000/user-info-to-database',
      params: {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        address: $scope.address,
        city: $scope.city,
        state: $scope.state,
        zip: $scope.zip,
        email: $scope.email,
        phoneNumber: $scope.phoneNumber,
        cardNum: $scope.cardNum,
        cardType: $scope.cardType,
        cardExpDate: $scope.cardExpDate
      }
    };
    $http(req).then((res) => {
      console.log(res);
    })
  }
}]);

/*
.service('checkoutService', () => {
  var firstName, lastName, address, city, state, zip, email, phoneNumber;
  var cardNum, cardType, cardExpDate;

  var setFirstName = (s) => {
    firstName = s;
  }

  var getFirstName = () => {
    return firstName;
  }

  var setLastName = (s) => {
    lastName = s;
  }

  var getLastName = () => {
    return lastName;
  }

  var setAddress = (s) => {
    address = s;
  }

  var getAddress = () => {
    return address;
  }

  var setCity = (s) => {
    city = s;
  }

  var getCity = () => {
    return city;
  }

  var setState = (s) => {
    state = s;
  }

  var getState = () => {
    return state;
  }

  var setZip = (s) => {
    zip = s;
  }

  var getZip = () => {
    return zip;
  }

  var setEmail = (s) => {
    email = s;
  }

  var getEmail = () => {
    return email;
  }

  var setPhoneNumber = (s) => {
    phoneNumber = s;
  }

  var getPhoneNumber = () => {
    return phoneNumber;
  }

  var setCardNum = (s) => {
    cardNum = s;
  }

  var getCardNum = () => {
    return cardNum;
  }

  var setCardType = (s) => {
    cardType = s;
  }

  var getCardType = () => {
    return cardType;
  }

  var setCardExpDate = (s) => {
    cardExpDate = s;
  }

  var getCardExpDate = () => {
    return cardExpDate;
  }

  return {
    setFirstName: setFirstName,
    getFirstName: getFirstName,
    setLastName: setLastName,
    getLastName: getLastName,
    setAddress: setAddress,
    getAddress: getAddress,
    setCity: setCity,
    getCity: getCity,
    setState: setState,
    getState: getState,
    setZip: setZip,
    getZip: getZip,
    setEmail: setEmail,
    getEmail: getEmail,
    setPhoneNumber: setPhoneNumber,
    getPhoneNumber: getPhoneNumber,
    setCardNum: setCardNum,
    getCardNum: getCardNum,
    setCardType: setCardType,
    getCardType: getCardType,
    setCardExpDate: setCardExpDate,
    getCardExpDate: getCardExpDate
  }

});
*/
