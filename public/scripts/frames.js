function getTasks() {
    var result = "ok";
    dataset = [];
    result = getTasksData();

    return result;
}

function getTasksData() {
    var result = "ok";

    // if (selectedSprint = "-1") {
    //     selectedDocument = "Backlog";
    // } else {
    //     selectedDocument = "S" + selectedSprint;
    // }
    selectedDocument = "S" + selectedSprint;
    db.collection(selectedDocument)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log('added');
                    createInstance(change.doc.data());
                }
                if (change.type === "modified") {
                    console.log('modified');
                    updateInstance(change.doc.data());
                }
                if (change.type === "removed") {
                    console.log('removed');
                    removeInstance(change.doc.data());
                }
            });
        });
    return result;
}

function createInstance(data) {
    var dataObj = new StoreData(data);
    dataset.push(dataObj);
}

function updateInstance(data) {
    var dataObj = new StoreData(data);

    dataset.forEach((element, index) => {
        if (element.title == dataObj.title) {
            console.log("found");
            dataset[index] = dataObj;
            return false;
        }
    });
}

function removeInstance(data) {
    var dataObj = new StoreData(data);

    dataset.forEach((element, index) => {
        if (element.title == dataObj.title) {
            console.log("found");
            dataset.splice(index, index + 1);

            return false;
        }
    });
}

function setDataIntoCard() {

    document.getElementById("cardsList").innerHTML = "";

    dataset.forEach(dataObj => {
        var id = dataObj.id;
        var title = dataObj.title;
        var des = dataObj.des;
        var estimatedTime = dataObj.estimatedTime;
        var difficulty = dataObj.difficulty;
        var priority = dataObj.priority;
        var assignee = dataObj.assignee;
        var creator = dataObj.creator;
        var category = dataObj.category;
        var status = dataObj.status;
        var logWorkTotalTime = dataObj.logWorkTotalTime;
        var workDone = dataObj.workDone;
        var creationDate = dataObj.creationDate;
        var sprintNumber = dataObj.sprintNumber;
        var storyPointNumber = dataObj.storyPointNumber;
        var tickets = document.getElementById("cardsList").innerHTML;

        if ((category == selectedCategory) || (status == selectedStatus)) {
            console.log(sprintNumber);


            var frame = "<div class=\"card text-white bg-dark mb-4\" onclick=\"showDescription('" + id + "','"
            frame += title;
            frame += "','"
            frame += des;
            frame += "','"
            frame += estimatedTime;
            frame += "','"
            frame += difficulty;
            frame += "','"
            frame += priority;
            frame += "','"
            frame += assignee;
            frame += "','"
            frame += creator;
            frame += "','"
            frame += status;
            frame += "','"
            frame += category;
            frame += "','"
            frame += logWorkTotalTime;
            frame += "','"
            frame += sprintNumber;
            frame += "','"
            frame += storyPointNumber;
            frame += "','"
            frame += workDone;
            frame += "','"
            frame += creationDate;
            frame += "')\" style=\"max-width: 32rem;\">";
            frame += "<div class=\"card-header\"> XX/XX/XXXX </div>";
            frame += "<div class=\"card-body py-3\">";
            frame += "<div class=\"row pb-2\">";
            frame += "<div class=\"col-md-4 col-4\">";
            frame += "<h6 class=\"card-title text-center py-1\" style=\"background-color: black;\"> Id: </h6>";
            frame += "</div>";
            frame += "<div class=\"col-md-8 col-8 px-2\">" + id + "</div>";
            frame += "</div>";

            frame += "<div class=\"row pb-2\">";
            frame += "<div class=\"col-md-4 col-4\">";
            frame += "<h6 class=\"card-title text-center py-1\" style=\"background-color: black;\"> Title: </h6>";
            frame += "</div>";
            frame += "<div class=\"col-md-8 col-8 px-2\">" + title + "</div>";
            frame += "</div>";

            frame += "<div class=\"row pb-2\">";
            frame += "<div class=\"col-md-4 col-4\">";
            frame += "<h6 class=\"card-title text-center py-1\" style=\"background-color: black;\"> Priority: </h6>";
            frame += "</div>";
            frame += "<div class=\"col-md-8 col-8 px-2\">" + priority + "</div>";
            frame += "</div>";

            frame += "<div class=\"row pb-2\">";
            frame += "<div class=\"col-md-4 col-4\">";
            frame += "<h6 class=\"card-title text-center py-1\" style=\"background-color: black;\"> Assignee: </h6>";
            frame += "</div>";
            frame += "<div class=\"col-md-8 col-8 px-2\">" + assignee + "</div>";
            frame += "</div>";

            frame += "<div class=\"row pb-2\">";
            frame += "<div class=\"col-md-4 col-4\">";
            frame += "<h6 class=\"card-title text-center py-1\" style=\"background-color: black;\"> Creator: </h6>";
            frame += "</div>";
            frame += "<div class=\"col-md-8 col-8 px-2\">" + creator + "</div>";
            frame += "</div>";

            frame += "</div>";
            frame += "</div>";
            tickets += frame;

            document.getElementById("cardsList").innerHTML = tickets;
        }
    });

    return "ok";
}

function showDescription(id, title, des, estimatedTime, difficulty, priority, assignee, creator, status, category, logWorkTotalTime, sprintNumber, storyPointNumber, workDone, creationDate) {
    newPage = "cardDescription";
    uiLoader();
    setDataIntoDescription(id, title, des, estimatedTime, difficulty, priority, assignee, creator, status, category, logWorkTotalTime, sprintNumber, storyPointNumber, workDone, creationDate);
}

function setDataIntoDescription(id, title, des, estimatedTime, difficulty, priority, assignee, creator, status, category, logWorkTotalTime, sprintNumber, storyPointNumber, workDone, creationDate) {
    document.getElementById("idTaskDescription").innerHTML = id;
    document.getElementById("titleTaskDescription").innerHTML = title;
    document.getElementById("descriptionTaskDescription").innerHTML = des;
    document.getElementById("priorityTaskDescription").innerHTML = priority;
    document.getElementById("assigneeTaskDescription").innerHTML = assignee;
    document.getElementById("creatorTaskDescription").innerHTML = creator;
    document.getElementById("categoryTaskDescription").innerHTML = category;
    document.getElementById("statusTaskDescription").innerHTML = status;
    document.getElementById("estimatedTimeTaskDescription").innerHTML = estimatedTime;
    document.getElementById("sprintNumberTaskDescription").innerHTML = sprintNumber;
    document.getElementById("difficultyTaskDescription").innerHTML = difficulty;
    document.getElementById("logHoursTaskDescription").innerHTML = logWorkTotalTime;
    document.getElementById("workDoneTaskDescription").innerHTML = workDone;
}

function fillDataIntoLogWorkPage(id, title, estimatedTime, logWorkTotalTime, workDone, sprintNumber) {
    document.getElementById("logTaskId").innerHTML = id;
    document.getElementById("logSprintNumber").innerHTML = sprintNumber;
    document.getElementById("logWorkTitle").innerHTML = title;
    document.getElementById("logWorkET").innerHTML = estimatedTime;
    document.getElementById("logWorkTotalTime").innerHTML = logWorkTotalTime;
    document.getElementById("logWorkDone").value = workDone;
    document.getElementById("logWorkRT").innerHTML = estimatedTime - logWorkTotalTime;
}