angular.module('forecastApp.controller', [])

.controller('weatherCtrl', ['$scope', 'forecastAppApi', function($scope, forecastAppApi, $routeParams) {

  $scope.flagLoading = false;
  $scope.flagLoadingDetails = true;

   // Random Cities Generate
   forecastAppApi.getRandomCitiesWeather().then(function (data) {
     $scope.weatherData = data;
     $scope.cnt = 9;
     $scope.flagLoading = true;
   });

   // Cities from user list
   var listData = [];
   var getFromLS = function () {
     for (var i = 0; i <= localStorage.length - 1; i++) {
       val = localStorage.key(i);
       listData.push(val);
     }
     return listData;
   };
   getFromLS();

   //Send request
   forecastAppApi.getWeatherFromList(listData).then(function (data) {
     $scope.weatherDataLS = data;
     $scope.cnt = 9;
   });

   $scope.loadMore = function (cnt) {
     $scope.cnt += 9;
   };


   //Manage favourite city
   $scope.favourite = function(id){
    var key = id;
    var city = id;
    if (document.getElementById(city).classList.contains('listed')){
      localStorage.removeItem(key);
      document.getElementById(city).classList.remove('listed');
    } else {
      localStorage.setItem(key, city);
      document.getElementById(city).classList.add('listed');
    };
   };

   //Search by city name
   $scope.chooseCity = function(cityId) {
      $scope.flagLoadingDetails = false;
     forecastAppApi.getCurrentForrecast(cityId).then(function(res){
       $scope.flagLoadingDetails = true;
       $scope.searchData = res;
       $scope.close = 'Close';
       $scope.searchDataDays = res.list;
       $scope.headingForecast = 'Forecast for 4 days';
       var city = res.city.id;
       var el = document.getElementsByClassName('card');
       for (var i = 0; i < el.length; i++) {
         if (el[i].classList.contains('daily')){
           el[i].classList.remove('daily');
         }
       }
       document.getElementById(city).classList.add('daily');
     });
   };
   $scope.closeCity = function() {
       $scope.searchData = '';
       $scope.close = '';
       $scope.searchDataDays = '';
       $scope.headingForecast = '';
       var el = document.getElementsByClassName('card');
       for (var i = 0; i < el.length; i++) {
          if (el[i].classList.contains('daily')){
            el[i].classList.remove('daily');
          }
        }
   };

   $scope.round = function(num) {
     // Round number up to 1 decimal places, use parseInt to prevent NaN on load
     return parseInt(Math.round(num * 10) / 10) || '';
   };
    var round = function(num) {
     // Round number up to 1 decimal places, use parseInt to prevent NaN on load
     return parseInt(Math.round(num * 10) / 10) || '';
   };

   $scope.kelvinToCelcius = function(kelvin) {
     // Convert degrees kelvin to degrees Celsius
     return round(kelvin - 273.15);
   };

   // If city is in LS adding listed class
   var addListed = function (id) {
     var key = id;
     if (localStorage.getItem(key) !== null) {
       document.getElementById(id).classList.add('listed');
     }
   }

   $scope.showIcon = function(icon) {
     // Choose the cosponsoring icon font letter to the correct weather type
     switch (icon) {
       case '01d':
         // Clear sky, day
         return icon = 'B';
         break;
       case '01n':
         // Clear sky, night
         return icon = 'C';
         break;
       case '02d':
         // Few clouds, day
         return icon = 'H';
         break;
       case '02n':
         // Few clouds, night
         return icon = 'I';
         break;
       case '03d':
       case '03n':
         // Scattered clouds
         return icon = 'N';
         break;
       case '04d':
       case '04n':
         // Broken clouds
         return icon = 'Y';
         break;
       case '09d':
       case '09n':
         // Shower rain
         return icon = 'R';
         break;
       case '10d':
       case '10n':
         // Rain
         return icon = 'Q';
         break;
       case '11d':
       case '11n':
         // Thunderstorm
         return icon = 'O';
         break;
       case '13d':
       case '13n':
         // Snow
         return icon = 'W';
         break;
       case '50d':
       case '50n':
         // Mist
         return icon = 'M';
         break;
       default:
         // Unsure of weather
         return icon = ')';
     };
   };

   $scope.changeColour = function (icon, id) {
     // Change the colour of the .card CSS cl
     addListed(id);
     switch (icon) {
       case '01d':
         // Clear sky, day
         return icon =  'orange';
         break;
       case '01n':
         // Clear sky, night
         return icon =  'purple';
         break;
       case '02d':
         // Few clouds, day
         return icon =  'orange';
         break;
       case '02n':
         // Few clouds, night
         return icon =  'purple';
         break;
       case '03d':
       case '03n':
         // Scattered clouds
         return icon =  'green';
         break;
       case '04d':
       case '04n':
         // Broken clouds
         return icon =  'green';
         break;
       case '09d':
       case '09n':
         // Shower rain
         return icon =  'blue';
         break;
       case '10d':
       case '10n':
         // Rain
         return icon =  'blue';
         break;
       case '11d':
       case '11n':
         // Thunderstorm
         return icon =  'blue';
         break;
       case '13d':
       case '13n':
         // Snow
         return icon =  'grey';
         break;
       case '50d':
       case '50n':
         // Mist
         return icon =  'grey';
         break;
       default:
         // Unsure of weather
         return icon =  'grey';
     };
   };
}]);
