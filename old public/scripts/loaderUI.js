function uiLoader() {
    var deactivationResult = deactivateUI();
    if (deactivationResult == "ok") {
        $("#" + newPage).show(100);
        currentPage = newPage;
        newPage = "";
    }
}

function deactivateUI() {
    var result = "error";
    if (newPage != "") {
        $("#" + currentPage).hide(100);
        result = "ok";
    }
    return result;
}