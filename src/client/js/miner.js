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