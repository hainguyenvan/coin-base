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

var app = angular.module('appBlockchain', []);
app.controller('ctrlBlockchain', function ($scope, $http) {
    $scope.chains = [];

    $scope.init = function () {
        $scope.getChains();
    }

    $scope.getChains = function () {
        $http({
                url: API_GET_CHAINS,
                method: "GET",
            })
            .then(function (res) {
                    $scope.chains = res.data;
                    console.log('Chains', $scope.chains);
                },
                function (res) {
                    // failed
                    console.log('Failed !');
                });
    }
});