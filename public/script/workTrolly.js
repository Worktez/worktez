$("#createNewTask").ready(function() {
    $("#createNewTask").hide(0);
    var date = new Date();
    document.getElementById("creationDateCreateNewTask").innerHTML = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
});

$("#createNewTaskButton").click(function () {
    $("#createNewTask").show();
       
});

$("#backToMainFromCreateNewTask").click(function() {
    $('#createNewTask').hide(100);
    $("#bodyContent").fadeIn(100);
});