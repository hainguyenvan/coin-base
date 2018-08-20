$(document).ready(function () {
    // Show modal add transactions
    $("#btnAddTransactions").click(function () {
        $("#modalAddTransactions").modal({
            backdrop: 'static',
            keyboard: false
        }).addClass('show');
    });
});


// Define url API
const API_GET_CHAINS = 'http://localhost:3002/api/blocks';
const API_GET_MINERS = 'http://localhost:3002/api/miners';

var app = angular.module('appBlockchain', []);
app.controller('ctrlBlockchain', function ($scope, $http) {
    $scope.chains = [];
    $scope.minerList = [];
    $scope.to = null;
    $scope.from = null;
    $scope.amount = null;

    $scope.init = function () {
        $scope.getChains();
        $scope.getMiner();
    }

    $scope.showModalAddTx = function () {
        $scope.to = null;
        $scope.from = null;
        $scope.amount = null;
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

    $scope.getChains = function () {
        $http({
                url: API_GET_CHAINS,
                method: "GET",
            })
            .then(function (res) {
                    $scope.chains = res.data;
                },
                function (res) {
                    // failed
                    console.log('Failed !');
                });
    }

    $scope.sendCoin = function () {
        var transactions = {
            from: $scope.from,
            to: $scope.to,
            amount: Number($scope.amount)
        }
        console.log('Transactions: ', transactions);
    }
});