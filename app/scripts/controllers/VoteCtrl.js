'use strict';

angular.module('crocktoberApp')
    .controller('VoteCtrl', function($scope, angularFireCollection, angularFire, fbURL, $routeParams) {

        $scope.categories = angularFireCollection(new Firebase(fbURL + 'categories'));

        var ref = new Firebase(fbURL + 'crocks/' + $routeParams.crockId);
        angularFire(ref, $scope, 'remoteCrock', {})
            .then(function() {
                $scope.crock = angular.copy($scope.remoteCrock);
                $scope.crock.$id = $routeParams.crockId;
                $scope.isClean = function() {
                    return angular.equals($scope.remoteCrock, $scope.crock);
                }
                $scope.destroy = function() {
                    $scope.remoteCrock = null;
                    $location.path('/');
                };
                $scope.save = function() {
                    $scope.remoteCrock = angular.copy($scope.crock);
                    $location.path('/');
                };
            });

    });