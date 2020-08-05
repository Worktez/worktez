$("#createNewTask").ready(function() {
    $("#createNewTask").hide(0);
});

$("#createNewTaskButton").click(function() {
    $("#createNewTask").show(100);
    var date = new Date();
    $("#creationDateCreateNewTask").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

});

$("#backToMainFromCreateNewTask").click(function() {
    $('#createNewTask').hide(100);
    $("#bodyContent").show(100);
});

$("#submitCreateNewTask").click(function() {
    var title = $("#titleCreateNewTask").val();
    var priority = $("#priorityCreateNewTask").val();
    var creator = $("#creatorCreateNewTask").val();
    var assignee = $("#assigneeCreateNewTask").val();
    var date = $("#creationDateCreateNewTask");

    console.log(title);
    console.log(priority);
    console.log(creator);
    console.log(assignee);

    $("#cardDate").html(date);
    $("#cardTitle").html(title);
    $("#cardPriority").html(priority);
    $("#cardCreator").html(creator);
    $("#cardAssignee").html(assignee);

});