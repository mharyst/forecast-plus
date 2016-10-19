angular.module('forecastApp.services', ['ngResource'])

    .factory('forecastAppApi', function($resource, $q) {
      var apiKey = '1e08279da9d0183da44193c0503fe8fd';
      var apiBaseUrl = 'https://api.openweathermap.org/data/2.5/';
      var ids = ['4140963','6361046','287286','6619279','2152658','1853908','1835848','1819729','2643741','2759794','2950159','2988507','6356055','4627266','745044','3201047','456172','3652462','6325494','1655558','7259612','418863','5039192','292223','6255152','1850147','3675707','3688357','4251958','2553455','3369157','4171563','702550','276781','1857910','963516','1880252','4158224','4426781','2766824','292968','6458923','3451190','1269517','5369143','5391997','3169070','2673730','3029799','3896433','7284824','3868626','3067696','2650225','3181381','6173331','3530597','4380997','281184','6255150'];
      var random = function (ids) {var ids2 = ids.sort(function() {return 0.5 - Math.random()});}
      random(ids);

      var resource = $resource('https://api.openweathermap.org/data/2.5/weather?q=:city&units=metric' + '&appid=' + apiKey, {
        city:'@city'
      });
      var resourceDaily = $resource('https://api.openweathermap.org/data/2.5/forecast/daily?id=:cityId&units=metric' + '&appid=' + apiKey, {
        cityId:'@cityId'
      });
      var resourceByGroupId = $resource('https://api.openweathermap.org/data/2.5/group?id=:ids' + '&appid=' + apiKey, {
        ids:'@ids'
      });
      var resourceByGroupIdLS = $resource('https://api.openweathermap.org/data/2.5/group?id=:id' + '&appid=' + apiKey, {
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
