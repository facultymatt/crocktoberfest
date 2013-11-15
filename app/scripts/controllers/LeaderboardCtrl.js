'use strict';

angular.module('crocktoberApp')
    .controller('LeaderboardCtrl', function($scope, Crocks, $timeout) {

    $timeout(function() {
        $scope.crocks = [];
        _.each(Crocks, function(crock) {
            $scope.crocks.push(new Crock(crock));
        });
        $scope.crocks = _.sortBy($scope.crocks, function(crock) { return -crock.weightedAverage; });
    }, 1000);

    function total(array) {
        return _.inject(array, function(s, e) { return s + e; });
    };

    function avg(array) {
        return Math.ceil((total(array) / array.length));
    };

    function Crock(data) {
        this.name            = data.name;
        this.votes           = _.map(data.votes, function(vote) { return new Vote(vote); });
        this.weighteds       = _.map(this.votes, function(vote) { return vote.weightedGPA || 0; });
        this.total           = total(this.weighteds);
        this.weightedAverage = avg(this.weighteds);
    };

    var weights = {
        'Eye Flavor': 10,
        'Sniff Quality': 10,
        'Mouth Feel': 10,
        'Tongue Effect': 50,
        'Overall': 20
    };

    function Vote(data) {
        this.category    = data.category;
        this.score       = data.score;
        this.weight      = weights[data.category];
        this.weightedGPA = this.score * this.weight;
    };
});
