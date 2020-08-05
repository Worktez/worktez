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

exports.createNewTask = functions.https.onRequest((req, resp) => {
    cors(req, resp, () => {
        console.log(req);
        var title = req.body.data.Title;
        var des = req.body.data.Description;
        var priority = req.body.data.Priority;
        var difficulty = req.body.data.Difficulty;
        var creator = req.body.data.Creator;
        var assignee = req.body.data.Assignee;
        var estimatedTime = req.body.data.EstimatedTime;
        var status = req.body.data.Status;
        var category = req.body.data.Category;
        var taskIdNumber = getIdNumber();
        var taskId = category[0] + taskIdNumber;
        var loggedWorkTotalTime = 0;
        var workDone = 0;

        console.log("hii");
        console.log(title);
        console.log(des);
        console.log(priority);
        console.log(difficulty);
        console.log(creator);
        console.log(assignee);
        console.log(estimatedTime);
        console.log(status);
        console.log(category);

        db.collection(category).doc(taskId).set({
                Title: title,
                Description: des,
                Priority: priority,
                Difficulty: difficulty,
                Creator: creator,
                Assignee: assignee,
                ET: estimatedTime,
                Status: status,
                Category: category,
                LogWorkTotalTime: loggedWorkTotalTime,
                WorkDone: workDone
            })
            .then(() => {
                var work = { data: "working" }
                resp.status(200).send(work);
                console.log("Document successfully written!");
            })
            .catch(() => {
                console.error("Error writing document: ", error);
            });

    });
});

function getIdNumber() {
    var today = new Date();
    var date = today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
    var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

    var result = date + time;

    return result;
}