'use strict';

angular.module('crocktoberApp')
    .controller('AdminCtrl', function($scope, Crocks, Categories, Judges, $routeParams) {

        $scope.newCrock = {};
        $scope.newCategory = {};
        $scope.newJudge = {};

        $scope.crocks = Crocks;
        $scope.categories = Categories;
        $scope.judges = Judges;


        // ------------------------------
        // Add items
        // ------------------------------
        $scope.addCrock = function() {
            $scope.crocks.add($scope.newCrock);
            $scope.newCrock = {};
        };

        $scope.addCategory = function() {
            $scope.categories.add($scope.newCategory);
            $scope.newCategory = {};
        };

        $scope.addJudge = function() {
            $scope.judges.add($scope.newJudge);
            $scope.newJudge = {};
        };


        // ------------------------------
        // Remove items
        // ------------------------------
        $scope.removeCrock = function(item) {
            $scope.crocks.remove(item);
        };

        $scope.removeCategory = function(item) {
            $scope.categories.remove(item);
        };

        $scope.removeJudge = function(item) {
            $scope.judges.remove(item);
        };

    });