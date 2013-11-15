'use strict';

angular.module('crocktoberApp')
    .controller('MainCtrl', function($q, $scope, $location, Crocks, Judges, $rootScope, Session, $timeout) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // get all crocks to the database
        $scope.crocks = Crocks;
        $scope.judges = Judges;

        // ------------------------------
        // Judge sign up process.
        // will set judge name for the rest of the session
        // and all votes will be referenced to this judges name
        // @note using id's would be more robust but names can't be changed 
        // right now so we're good to go. 
        // ------------------------------
        $rootScope.thisJudge = $rootScope.thisJudge || null;

        // dirty way to keep track of voted crocks
        //$rootScope.hasVoted = $rootScope.hasVoted || [];

        $scope.hasVoted = Session.hasVoted;
        console.log('$scope.hasVoted ', $scope.hasVoted);

        // if we have a judge stored, we can vote!
        if ($rootScope.thisJudge) $scope.readyToVote = true;

        $scope.newJudge = {};

        $scope.letsGo = function() {

            // add to firebase
            $scope.judges.add($scope.newJudge);

            // set local session judge
            $rootScope.thisJudge = $scope.newJudge;

            // clear new judge
            $scope.newJudge = {};

            // lets start! 
            $scope.readyToVote = true;

        };


        $scope.hasJudgeVoted = function(itemName) {
            var hasvoted = false;
            _.each(Session.hasVoted, function(item, key) {
                if(itemName == item.crock) hasvoted = true;
            })
            return hasvoted;
        }


    });
