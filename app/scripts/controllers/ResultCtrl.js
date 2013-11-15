'use strict';

angular.module('crocktoberApp')
    .controller('ResultCtrl', function($scope, Crocks, Categories, Judges, $routeParams) {

        $scope.crocks = Crocks;


    });