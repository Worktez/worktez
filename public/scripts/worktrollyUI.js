$("#createNewTask").ready(function() {
    $("#createNewTask").hide(0);


});

$("#createNewTaskButton").click(function() {
    $("#createNewTask").show();
    var date = new Date();
    $("#creationDateCreateNewTask").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

});

$("#backToMainFromCreateNewTask").click(function() {
    $('#createNewTask').hide(100);
});