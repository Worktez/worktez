function getTasks() {
    var result = "ok";
    dataset = [];
    result = getTasksData();

    return result;
}

function getTasksData() {
    var result = "ok";
    var selectedDocument = "S" + selectedSprint;
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
        var logHours = dataObj.logHours;
        var priority = dataObj.priority;
        var assignee = dataObj.assignee;
        var creator = dataObj.creator;
        var category = dataObj.category;
        var status = dataObj.status;
        var logWorkTotalTime = dataObj.logWorkTotalTime;
        var workDone = dataObj.workDone;
        var creationDate = dataObj.creationDate;
        var createNewTaskSprintNumber = dataObj.createNewTaskSprintNumber;
        var storyPointerNumber = dataObj.storyPointerNumber;
        var tickets = document.getElementById("cardsList").innerHTML;

        if (category == selectedCategory) {


            var frame = "<div class=\"card text-white bg-dark mb-4\" onclick=\"showDescription('" + id + "','" + title + "','" + des + "','" + estimatedTime + "','" + difficulty + "','" + logHours + "','" + priority + "','" + assignee + "','" + creator + "','" + category + "','" + status + "','" + logWorkTotalTime + "','" + workDone + "','" + creationDate + "','" + createNewTaskSprintNumber + "','" + storyPointerNumber + "')\" style=\"max-width: 32rem;\">";
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

        // if (status != selectedStatus) {
        //     document.getElementById("cardsList").innerHTML = tickets;
        // }

    });



    return "ok";
}

function showDescription(id, title, des, estimatedTime, difficulty, logHours, priority, assignee, creator, status, category, logWorkTotalTime, createNewTaskSprintNumber, storyPointerNumber, workDone, creationDate) {
    newPage = "cardDescription";
    uiLoader();


    // dataset.forEach(element => {
    //     if (element.id == id) {
    setDataIntoDescription(id, title, des, estimatedTime, difficulty, logHours, priority, assignee, creator, status, category, logWorkTotalTime, createNewTaskSprintNumber, storyPointerNumber, workDone, creationDate);
    //     }
    // });
}

function setDataIntoDescription(id, title, des, estimatedTime, difficulty, logHours, priority, assignee, creator, status, category, logWorkTotalTime, createNewTaskSprintNumber, storyPointerNumber, workDone, creationDate) {
    document.getElementById("framesDetailsTitle").innerHTML = title;
    document.getElementById("framesDetailsDescription").innerHTML = des;
    document.getElementById("framesDetailsPriority").innerHTML = priority;
    document.getElementById("framesDetailsAssignee").innerHTML = assignee;
    document.getElementById("framesDetailsCreator").innerHTML = creator;
    document.getElementById("framesDetailsCategory").innerHTML = category;
    document.getElementById("framesDetailsStatus").innerHTML = status;
    document.getElementById("framesDetailsEstimatedTime").innerHTML = estimatedTime;
    document.getElementById("framesDetailsDifficulty").innerHTML = difficulty;
    document.getElementById("framesDetailsLogHours").innerHTML = logHours;
    document.getElementById("framesDetailsWorkDone").innerHTML = workDone;

}



// function setEditDetail(Title) {
//     dataset.forEach(dataObj => {
//         var title = dataObj.title;
//         var des = dataObj.des;
//         var priority = dataObj.priority;
//         var assignee = dataObj.assignee;
//         var creator = dataObj.creator;
//         var category = dataObj.category;
//         var status = dataObj.status;
//         var estimatedTime = dataObj.estimatedTime;
//         var difficulty = dataObj.difficulty;
//         // var sprintNo = dataObj.sprintNo;
//         // var storyPoint = dataObj.storyPoint;

//         console.log(title);

//         if (Title == title) {
//             document.getElementById("editDetailsTitle").innerHTML = title;
//             document.getElementById("editDetailsDescription").value = des;
//             document.getElementById("editDetailsPriority").value = priority;
//             document.getElementById("editDetailsAssignee").value = assignee;
//             document.getElementById("editDetailsCreator").innerHTML = creator;
//             document.getElementById("editDetailsCategory").value = category;
//             document.getElementById("editDetailsStatus").value = status;
//             document.getElementById("editDetailsEstimatedTime").value = estimatedTime;
//             document.getElementById("editDetailsDifficulty").value = difficulty;
//             // document.getElementById("editDetailsSprintNumber").innerHTML = sprintNo;
//             // document.getElementById("editDetailsStoryPoint").innerHTML = storyPoint;
//         }
//     });
// }


// function fillEditWork(id) {
//     document.getElementById("editWorkId").innerHTML = id;
//     document.getElementById("editWorkTitle").value = datalist[id].title;
//     document.getElementById("editWorkDes").value = datalist[id].des;
//     document.getElementById("editWorkPriority").value = datalist[id].priority;
//     document.getElementById("editWorkDifficulty").value = datalist[id].difficulty;
//     document.getElementById("editWorkCreator").innerHTML = datalist[id].creator;
//     document.getElementById("editWorkAssignee").value = datalist[id].assignee;
//     document.getElementById("editWorkEstimatedTime").value = datalist[id].estimatedTime;
//     document.getElementById("editWorkStatus").value = datalist[id].status;
//     document.getElementById("editWorkCategory").value = datalist[id].category;
// }