$("#createNewTaskButton").click(function() {
    newPage = "createNewTask";
    uiLoader();
    var date = new Date();
    $("#creationDateCreateNewTask").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

});

$("#startNewSprint").ready(function() {
    $("#startNewSprint").hide(0);
});

$("#startNewSprintButton").click(function() {
    newPage = "startNewSprint";
    uiLoader();
});



$("#backToMainFromCreateNewTask").click(function() {
    newPage = "bodyContent";
    uiLoader();
});

$("#backToMainFromNewSprint").click(function() {
    newPage = "bodyContent";
    uiLoader();
});


$("#bodyContent").ready(function() {
    var result = getDashboardData();
    console.log(result);
});

$("#filterSprint").click(function() {
    var filterSprintNumber = $("#filterSprintNumber").val();
    sprintFilter(filterSprintNumber);
});

$("#currentSprint").click(function() {
    currentSprintDashboard();
});

$("#createNewTask").ready(function() {
    $("#createNewTask").hide(0);
});

$("#editTask").ready(function() {
    $("#editTask").hide(0);
});

$("#logWork").ready(function() {
    $("#logWork").hide(0);
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
        newPage = "bodyContent";
        uiLoader();
    });
});