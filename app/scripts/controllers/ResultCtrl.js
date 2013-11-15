'use strict';

angular.module('crocktoberApp')
    .controller('ResultCtrl', function($scope, Crocks, Categories, Judges, $routeParams) {

        $scope.crocks = Crocks;

        $scope.getPoints = function(item) {

            item.score = 0;

            var votes = _.groupBy(item.votes, function(singleVote) {
                return singleVote.category;
            });

            _.each(votes, function(v) {
                _.each(v, function(vv) {
                    if(!vv.score) return;
                    var weight = 1;
                    
                    if(vv.weight) {
                        weight = parseInt(vv.weight, 10);
                    }

                    var value = parseInt(vv.score, 10);
                    item.score += (value * weight);
                });
            })

            return item.score;

            // _.each(item.votes, function(items, key) {
                


            //     console.log(items);

            // })

        }

    });