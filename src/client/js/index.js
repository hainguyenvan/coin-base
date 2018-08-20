$(document).ready(function () {
    // Show modal add transactions
    $("#btnAddTransactions").click(function () {
        $("#modalAddTransactions").modal({
            backdrop: 'static',
            keyboard: false
          }).addClass('show');
    });
});