var app = angular.module('app', []);
 
app.controller('MainCtrl', function ($scope) {
  $scope.things = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});