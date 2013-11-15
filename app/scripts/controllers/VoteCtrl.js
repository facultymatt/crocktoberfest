'use strict';

angular.module('crocktoberApp')
    .controller('VoteCtrl', function($scope, Categories, angularFire, $routeParams, fbURL, $rootScope, $location, Session) {

        if(!Session.thisJudge) $location.url('/');

        var ref = new Firebase(fbURL + 'crocks/' + $routeParams.crockId);
        angularFire(ref, $scope, 'remoteCrock', {})
            .then(function() {
                $scope.categories = Categories;
                $scope.votes = [];
                $scope.crock = angular.copy($scope.remoteCrock);
                $scope.crock.$id = $routeParams.crockId;
                $scope.isClean = function() {
                    return angular.equals($scope.remoteCrock, $scope.crock);
                }
                $scope.destroy = function() {
                    $scope.remoteCrock = null;
                    $location.path('/');
                };

                $scope.castVotes = function() {

                    var parsedVotes = [];

                    // create parsed vote object.
                    // @note that firebase won't store non-integer array keys
                    _.each($scope.votes, function(score, key) {
                        parsedVotes.push({
                            category: $scope.categories[key].name,
                            weight: $scope.categories[key].weight,
                            score: score,
                            judge: Session.thisJudge.name
                        });
                    });

                    console.log(Session.thisJudge);

                    // create votes object is crock has no votes
                    if(!$scope.crock.votes) $scope.crock.votes = [];

                    // add our parsed votes, which contain category, score, and judge name
                    $scope.crock.votes = $scope.crock.votes.concat(parsedVotes);

                    Session.hasVoted.push({
                        crock: $scope.crock.name
                    });

                    // call save
                    $scope.save();
                }

                $scope.save = function() {
                    console.log($scope.crock);
                    $scope.remoteCrock = angular.copy($scope.crock);
                    $location.path('/');
                };
            });

    });
