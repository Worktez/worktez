$("#createNewTask").ready(function() {
    $("#createNewTask").hide(0);
});

$("#createNewTaskButton").click(function() {
    $("#createNewTask").show(100);
    var date = new Date();
    $("#creationDateCreateNewTask").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

});

$("#createNewSprint").ready(function() {
    $("#createNewSprint").hide(0);
});

$("#createNewSprintButton").click(function() {
    $("#createNewSprint").show(100);
    var date = new Date();
    $("#creationDateCreateNewSprint").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" +   date.getFullYear());
});
  


$("#backToMainFromCreateNewTask").click(function() {
    $('#createNewTask').hide(100);
    $("#bodyContent").show(100);
});

$("#backToMainFromCreateNewSprint").click(function() {
    $('#createNewSprint').hide(100);
    $("#bodyContent").show(100);
});


$("#bodyContent").ready(function() {
    var result = getTasks();
    console.log(result);
});



$("#submitCreateNewTask").click(function() {

    var title = $("#titleCreateNewTask").val();
    var des = $("#desCreateNewTask").val();
    var priority = $("#priorityCreateNewTask").val();
    var difficulty = $("#difficultyCreateNewTask").val();
    var creator = $("#creatorCreateNewTask").val();
    var assignee = $("#assigneeCreateNewTask").val();
    var estimatedTime = $("#estimatedTimeCreateNewTask").val();
    var status = $("#statusCreateNewTask").val();
    var category = $("#categoryCreateNewTask").val();

    console.log(title);
    console.log(des);
    console.log(priority);
    console.log(difficulty);
    console.log(creator);
    console.log(assignee);
    console.log(estimatedTime);
    console.log(status);
    console.log(category);

    var createNewTaskFunction = firebase.functions().httpsCallable('createNewTask');
    createNewTaskFunction({ Title: title, Description: des, Priority: priority, Difficulty: difficulty, Creator: creator, Assignee: assignee, EstimatedTime: estimatedTime, Status: status, Category: category }).then(result => {
        console.log(result.data);
        $("#createNewTask").hide(100);
    });
});