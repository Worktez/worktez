$("#createNewTaskButton").click(function() {
    newPage = "createNewTask";
    uiLoader();
    var date = new Date();
    $("#creationDateCreateNewTask").html(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
    $("#bodyContent").hide(100);
    $("#work").hide(100);
    $("#close").hide(100);
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
    fillDataIntoLogWorkPage(id, title, estimatedTime, logWorkTotalTime, workDone, sprintNumber, );
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

$("#backToMainFromCreateNewTask").click(function() {
    newPage = "bodyContent";
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
    $("#work").hide(100);
    $("#close").hide(100);

});

$("#log").click(function() {
    $("#bodyContent").hide(100);

    $("#close").hide(100);
    $("#work").show(100);

});

$("#cardsList").click(function() {
    $('#createNewTask').hide(100);
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

$("#currentSprintButton").click(function() {
    currentSprintFilter();
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

const createNewTaskForm = document.getElementById("createNewTaskForm");
createNewTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (createNewTaskForm.checkValidity() === false) {
        e.stopPropagation();
        createNewTaskForm.classList.add('was-validated');
    } else {
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
        var creationDate = $("#creationDateCreateNewTask").html();
        createNewTaskForm.classList.remove('was-validated');
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
        console.log(creationDate);

        var createNewTaskFunction = firebase.functions().httpsCallable('createNewTask');
        createNewTaskFunction({ Title: title, Description: des, Priority: priority, Difficulty: difficulty, Creator: creator, Assignee: assignee, EstimatedTime: estimatedTime, Status: status, Category: category, SprintNumber: sprintNumber, StoryPointNumber: storyPointNumber, CreationDate: creationDate }).then(result => {
            console.log(result.data);
            newPage = "dashboard";
            uiLoader();
        });
        $('input').val('');
        $('select').val('');
        $('textarea').val('');
    }
});
const startNewSprintForm = document.getElementById("startNewSprintForm");
startNewSprintForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (startNewSprintForm.checkValidity() === false) {
        e.stopPropagation();
        startNewSprintForm.classList.add('was-validated');
    } else {
        var startDate = $("#startdateNewSprint").val();
        var endDate = $("#enddateNewSprint").val();
        var status = $("#statusNewSprint").val();
        var totalDevelopment = parseInt($("#totalDevelopmentTaskNewSprint").html());
        var totalBusiness = parseInt($("#totalBusinessTaskNewSprint").html());
        var totalMarketing = parseInt($("#totalMarketingTaskNewSprint").html());
        startNewSprintForm.classList.remove('was-validated');
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
    }
});

var logWorkTaskForm = document.getElementById("logWorkTaskForm");
logWorkTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (logWorkTaskForm.checkValidity() === false) {
        e.stopPropagation();
        logWorkTaskForm.classList.add('was-validated');
    } else {
        var sprintNumber = $("#logSprintNumber").html();
        var logTaskId = $("#logTaskId").html();
        var logWorkDone = $("#logWorkDone").val();
        var logWorkStatus = $("#logWorkStatus").val();
        var logHours = $("#logWorkHour").val();
        var logWorkComment = $("#logWorkComment").val();
        logWorkTaskForm.classList.remove('was-validated');
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
            $('input').val('');
        });
    }
});
const editPageTaskForm = document.getElementById("editPageTaskForm");
editPageTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (editPageTaskForm.checkValidity() === false) {
        e.stopPropagation();
        editPageTaskForm.classList.add('was-validated');
    } else {
        var id = $("#editPageTaskId").html();
        var creationDate = $("#creationDateTaskDescription").html();
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
        var logWorkTotalTime = $("#logHoursTaskDescription").html();
        editPageTaskForm.classList.remove('was-validated');
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
        console.log(creationDate);
        console.log(logWorkTotalTime);
        var editPageTaskFunction = firebase.functions().httpsCallable('editPageTask');
        editPageTaskFunction({ Id: id, Title: title, Creator: creator, Description: des, Priority: priority, Difficulty: difficulty, Assignee: assignee, EstimatedTime: estimatedTime, Status: status, Category: category, SprintNumber: sprintNumber, StoryPointNumber: storyPointNumber, PreviousId: previousId, LogWorkTotalTime: logWorkTotalTime, LogWorkDone: logWorkDone, CreationDate: creationDate }).then(result => {
            console.log(result.data);
            newPage = "dashboard";
            uiLoader();
            $('input').val('');
        });
    }
});