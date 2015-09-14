var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

   this.addNewGame = function(gameObject){
     var urlMade = 'https://api.parse.com/1/classes/' + gameObject.homeTeam;
     if(parseInt(gameObject.score) > parseInt(gameObject.opponentScore)){
       gameObject.won = true;
     }else{
       gameObject.won = false;
     }
     return $http({
       method: 'POST',
       url: urlMade,
       data: gameObject

     });
   };

   this.getTeamData= function(team){
     var deferred = $q.defer();
     var Murl = 'https://api.parse.com/1/classes/' + team;

     $http({
       method: "GET",
       url: Murl
     }).then(function(data){
       var results = data.data.results;
       var wins = 0;
       var losses =0;
       console.log(results);
       for(var i = 0; i < results.length; i++){
         if(results[i].won == true){
         wins++;
         } else {
           losses++;
       }
     }
     results.wins = wins;
     results.losses = losses;
     deferred.resolve(results);

     });

     return deferred.promise;
   };

});
