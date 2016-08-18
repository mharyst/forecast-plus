angular.module('forecastApp', [
  'ngRoute',
  'forecastApp.controller',
  'forecastApp.services',
  'forecastApp.filters'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/forecast', {
    templateUrl: 'partials/forecast.html',
    controller: 'weatherCtrl'
  }).
  when('/favourite', {
    templateUrl: 'partials/favourite.html',
    controller: 'weatherCtrl'
  }).
  otherwise({redirectTo: '/forecast'});
}]);
