$("#createNewTaskButton").click(function() {
    newPage = "createNewTask";
    uiLoader();
    var date = new Date();
    $("#creationDateCreateNewTask").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
});

$("#startNewSprint").ready(function() {
    $("#startNewSprint").hide(0);
});

$("#logWorkPage").click(function() {
    var id = $("#idTaskDescription").html();
    var title = $("#titleTaskDescription").html();
    var estimatedTime = $("#estimatedTimeTaskDescription").html();
    var logWorkTotalTime = $("#logHoursTaskDescription").html();
    var workDone = $("#workDoneTaskDescription").html();
    var sprintNumber = $("#sprintNumberTaskDescription").html();
    console.log(sprintNumber);
    newPage = "logWorkTask";
    uiLoader();
    fillDataIntoLogWorkPage(id, title, estimatedTime, logWorkTotalTime, workDone, sprintNumber);
});

$("#editPage").click(function() {
    var id = $("#idTaskDescription").html();
    var title = $("#titleTaskDescription").html();
    var des = $("#descriptionTaskDescription").html();
    var priority = $("#priorityTaskDescription").html();
    var difficulty = $("#difficultyTaskDescription").html();
    var creator = $("#creatorTaskDescription").html();
    var assignee = $("#assigneeTaskDescription").html();
    var estimatedTime = $("#estimatedTimeTaskDescription").html();
    var status = $("#statusTaskDescription").html();
    var category = $("#categoryTaskDescription").html();
    var storyPointNumber = $("#storyPointNumberTaskDescription").html();
    var sprintNumber = $("#sprintNumberTaskDescription").html();
    console.log(title);
    newPage = "editPageTask";
    uiLoader();
    fillDataIntoEditPageTask(id, title, des, estimatedTime, difficulty, priority, assignee, creator, status, category, sprintNumber, storyPointNumber)
});

$("#startNewSprintButton").click(function() {
    newPage = "startNewSprint";
    uiLoader();
    getNewSprintId();
});

$("#backToDashboard").click(function() {
    newPage = "dashboard";
    uiLoader();
});

$("#backToMain").click(function() {
    newPage = "dashboard";
    uiLoader();
});

$("#backToMainFromNewSprint").click(function() {
    newPage = "dashboard";
    uiLoader();
});

$("#dashboard").ready(function() {
    var result = getDashboardData();
    console.log(result);
});

$("#Business").click(function() {
    selectedCategory = "Business";
    newPage = "taskPage";
    uiLoader();
    setDataIntoCard();
});

$("#Development").click(function() {
    selectedCategory = "Development";
    newPage = "taskPage";
    uiLoader();
    setDataIntoCard();

});

$("#Marketing").click(function() {
    selectedCategory = "Marketing";
    newPage = "taskPage";
    uiLoader();
    setDataIntoCard();
});

$("#backlogButton").click(function() {
    selectedSprint = "-1";
    setDataIntoDashboard();
});

$("#completedTask").click(function() {
    selectedStatus = "Completed";
    newPage = "taskPage";
    uiLoader();
    setDataIntoCard();
});

$("#filterSprint").click(function() {
    var filterSprintNumber = $("#filterSprintNumber").val();
    sprintFilter(filterSprintNumber);
});


$("#taskPage").ready(function() {
    $("#taskPage").hide(0);
});

$("#createNewTask").ready(function() {
    $("#createNewTask").hide(0);
});

$("#editPageTask").ready(function() {
    $("#editPageTask").hide(0);
});

$("#logWorkTask").ready(function() {
    $("#logWorkTask").hide(0);
});

$("#cardDescription").ready(function() {
    $("#cardDescription").hide(0);
});

$("#deleteTaskCard").click(function() {
    var id = $("#idTaskDescription").html();
    var sprintNumber = $("#sprintNumberTaskDescription").html();
    var category = $("#categoryTaskDescription").html();

    console.log(id + " deleted");

    var deleteCardTask = firebase.functions().httpsCallable('deleteTask');
    deleteCardTask({ Id: id, SprintNumber: sprintNumber, Category: category }).then(result => {
        console.log(result.data);
        newPage = "dashboard";
        uiLoader();
    });
});

$("#backToMainFromCardDescription").click(function() {
    newPage = "dashboard";
    uiLoader();
});

$("#backToMainFromEditPageTask").click(function() {
    newPage = "dashboard";
    uiLoader();
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
    var storyPointNumber = $("#storyPointNumber").val();
    var sprintNumber = $("#createNewTaskSprintNumber").val();
    console.log(title);
    console.log(des);
    console.log(priority);
    console.log(difficulty);
    console.log(creator);
    console.log(assignee);
    console.log(estimatedTime);
    console.log(status);
    console.log(category);
    console.log(sprintNumber);
    console.log(storyPointNumber);

    var createNewTaskFunction = firebase.functions().httpsCallable('createNewTask');
    createNewTaskFunction({ Title: title, Description: des, Priority: priority, Difficulty: difficulty, Creator: creator, Assignee: assignee, EstimatedTime: estimatedTime, Status: status, Category: category, SprintNumber: sprintNumber, StoryPointNumber: storyPointNumber }).then(result => {
        console.log(result.data);
        newPage = "dashboard";
        uiLoader();
    });
    $('input').val('');
    $('select').val('');
    $('textarea').val('');
});

$("#submitNewSprint").click(function() {
    var startDate = $("#startdateNewSprint").val();
    var endDate = $("#enddateNewSprint").val();
    var status = $("#statusNewSprint").val();
    var totalDevelopment = parseInt($("#totalDevelopmentTaskNewSprint").html());
    var totalBusiness = parseInt($("#totalBusinessTaskNewSprint").html());
    var totalMarketing = parseInt($("#totalMarketingTaskNewSprint").html());

    console.log(totalDevelopment);
    console.log(totalBusiness);
    console.log(totalMarketing);
    console.log(startDate);
    console.log(endDate);
    console.log(status);

    var startNewSprintFunction = firebase.functions().httpsCallable('startNewSprint');
    startNewSprintFunction({ StartDate: startDate, EndDate: endDate, Status: status, TotalDevelopment: totalDevelopment, TotalBusiness: totalBusiness, TotalMarketing: totalMarketing }).then(result => {
        console.log(result.data);
        newPage = "dashboard";
        uiLoader();
    });
    $('input').val('');
});

$("#logWorkSubmit").click(function() {
    var sprintNumber = $("#logSprintNumber").html();
    var logTaskId = $("#logTaskId").html();
    var logWorkDone = $("#logWorkDone").val();
    var logWorkComment = "";
    var logWorkStatus = $("#logWorkStatus").val();
    var logHours = $("#logWorkHour").val();

    console.log(sprintNumber);
    console.log(logTaskId);
    console.log(logWorkDone);
    console.log(logWorkComment);
    console.log(logWorkStatus);
    console.log(logHours);

    var logWorkFunction = firebase.functions().httpsCallable('logWork');
    logWorkFunction({ SprintNumber: sprintNumber, LogTaskId: logTaskId, LogHours: logHours, LogWorkDone: logWorkDone, LogWorkStatus: logWorkStatus, LogWorkComment: logWorkComment }).then(result => {
        console.log(result.data);
        newPage = "dashboard";
        uiLoader();
    });

});

$("#submitEditPageTask").click(function() {
    var id = $("#editPageTaskId").html();
    var title = $("#titleEditPageTask").html();
    var creator = $("#creatorEditPageTask").html();
    var des = $("#descriptionEditPageTask").val();
    var priority = $("#priorityEditPageTask").val();
    var difficulty = $("#difficultyEditPageTask").val();
    var assignee = $("#assigneeEditPageTask").val();
    var estimatedTime = $("#estimatedTimeEditPageTask").val();
    var status = $("#statusEditPageTask").val();
    var category = $("#categoryEditPageTask").val();
    var storyPointNumber = $("#storyPointEditPageTask").val();
    var sprintNumber = $("#sprintNumberEditPageTask").val();
    var previousId = $("#sprintNumberTaskDescription").html();
    var logWorkDone = $("#workDoneTaskDescription").html();
    var logHours = $("#logHoursTaskDescription").html();

    console.log(id);
    console.log(title);
    console.log(creator);
    console.log(des);
    console.log(priority);
    console.log(difficulty);
    console.log(assignee);
    console.log(estimatedTime);
    console.log(status);
    console.log(category);
    console.log(sprintNumber);
    console.log(storyPointNumber);

    var editPageTaskFunction = firebase.functions().httpsCallable('editPageTask');
    editPageTaskFunction({ Id: id, Title: title, Creator: creator, Description: des, Priority: priority, Difficulty: difficulty, Assignee: assignee, EstimatedTime: estimatedTime, Status: status, Category: category, SprintNumber: sprintNumber, StoryPointNumber: storyPointNumber, PreviousId: previousId, LogHours: logHours, LogWorkDone: logWorkDone, }).then(result => {
        console.log(result.data);
        newPage = "dashboard";
        uiLoader();
    });
});