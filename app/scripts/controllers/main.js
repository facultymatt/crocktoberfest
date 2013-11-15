'use strict';

angular.module('crocktoberApp')
    .controller('MainCtrl', function($scope, $location, Crocks) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.crocks = Crocks;

    });