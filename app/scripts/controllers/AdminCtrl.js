'use strict';

angular.module('crocktoberApp')
    .controller('AdminCtrl', function($scope, Crocks, Categories, Judges, $routeParams) {

        $scope.newCrock = {};
        $scope.newCategory = {};
        $scope.newJudge = {};

        $scope.crocks = Crocks;
        $scope.categories = Categories;
        $scope.judges = Judges;

        $scope.addItem = function(item, collection) {
            collection.add(item);
            
            console.log(item);
            item = {};
        }


    });