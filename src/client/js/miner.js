$(document).ready(function () {
    // Show modal add miner
    $("#btnAddMiner").click(function () {
        $("#modalAddMiner").modal({
            backdrop: 'static',
            keyboard: false
        }).addClass('show');
    });

    // Show modal mining
    $("#btnMining").click(function () {
        $("#modalMining").modal({
            backdrop: 'static',
            keyboard: false
        }).addClass('show');
    });
});

// Define url API
const API_ADD_MINER = 'http://localhost:3002/api/addMiner';
const API_GET_MINERS = 'http://localhost:3002/api/miners';

var app = angular.module('appMiner', []);
app.controller('ctrlMiner', function ($scope, $http) {
    $scope.minerName = '';
    $scope.minerList = [];
    $scope.addMiner = null;

    $scope.init = function () {
        $scope.getMiner();
    }

    $scope.showModalAddMiner = function () {
        $scope.minerName = '';
    }

    $scope.addMiner = function () {
        $http({
                url: API_ADD_MINER,
                method: "POST",
                data: {
                    'name': $scope.minerName
                }
            })
            .then(function (res) {
                    // success
                    $scope.getMiner();
                },
                function (res) {
                    // failed
                    console.log('Failed !');
                });
    }

    $scope.getMiner = function () {
        $http({
                url: API_GET_MINERS,
                method: "GET",
            })
            .then(function (res) {
                    $scope.minerList = res.data;
                },
                function (res) {
                    // failed
                    console.log('Failed !');
                });
    }

    $scope.showModalMining = function() {
        $scope.addMiner = null;
    }

    $scope.mining = function () {
        console.log('Miner : ', $scope.addMiner);
    }
});