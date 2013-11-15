'use strict';

angular.module('crocktoberApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'firebase'
])
  .value('fbURL', 'https://crocktoberfest.firebaseio.com/')
  .factory('Crocks', function(angularFireCollection, fbURL) {
    return angularFireCollection(new Firebase(fbURL + 'crocks'));
  })
  .factory('Categories', function(angularFireCollection, fbURL) {
    return angularFireCollection(new Firebase(fbURL + 'categories'));
  })
  .factory('Judges', function(angularFireCollection, fbURL) {
    return angularFireCollection(new Firebase(fbURL + 'judges'));
  })
  .factory('Session', function() {
    return {
      thisJudge: null,
      hasVoted: []
    }
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/results', {
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl'
      })
      .when('/vote/:crockId', {
        controller: 'VoteCtrl',
        templateUrl: 'views/vote.html'
      })
      .when('/admin', {
        controller: 'AdminCtrl',
        templateUrl: 'views/admin.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });