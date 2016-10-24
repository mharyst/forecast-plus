angular.module('forecastApp.services', ['ngResource'])

    .factory('forecastAppApi', function($resource, $q) {
      var apiKey = '1e08279da9d0183da44193c0503fe8fd';
      var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';
      var ids = ['4140963','6361046','287286','6619279','2152658','1853908','1835848','1819729','2643741','2759794','2950159','2988507','6356055','4627266','745044','3201047','456172','3652462','6325494','1655558','7259612','418863','5039192','292223','6255152','1850147','3675707','3688357'];
      var random = function (ids) {var ids2 = ids.sort(function() {return 0.5 - Math.random()});}
      random(ids);

      var resource = $resource('http://api.openweathermap.org/data/2.5/weather?q=:city&units=metric' + '&appid=' + apiKey, {
        city:'@city'
      });
      var resourceDaily = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityId&units=metric' + '&appid=' + apiKey, {
        cityId:'@cityId'
      });
      var resourceByGroupId = $resource('http://api.openweathermap.org/data/2.5/group?id=:ids' + '&appid=' + apiKey, {
        ids:'@ids'
      });
      var resourceByGroupIdLS = $resource('http://api.openweathermap.org/data/2.5/group?id=:id' + '&appid=' + apiKey, {
        id:'@id'
      });
    		return {
    			getCurrentForrecast: function(cityId){
    				var deferred = $q.defer();

    				resourceDaily.get({cityId:cityId},
    					function (data){
    					deferred.resolve(data);
    				},
    				function(response){
    					deferred.reject(response);
    				});

    				return deferred.promise;
    			},
    			getCurrentWeatherData: function(city){
    				var deferred = $q.defer();

    				resource.get({city:city},
    					function (data){
    					deferred.resolve(data);
    				},
    				function(response){
    					deferred.reject(response);
    				});

    				return deferred.promise;
    			},
    			getWeatherFromList: function(id){
    				var deferred = $q.defer();

    				resourceByGroupIdLS.get({id:id},
    					function (data){
    					deferred.resolve(data);
    				},
    				function(response){
    					deferred.reject(response);
    				});

    				return deferred.promise;
    			},
          getRandomCitiesWeather: function(cities){
    				var deferred = $q.defer();

    				resourceByGroupId.get({ids:ids},
    					function (data){
    					deferred.resolve(data);
    				},
    				function(response){
    					deferred.reject(response);
    				});

    				return deferred.promise;
    			}

    		};
    });
