function getDashboardData() {
    db.collection("Main").doc("RawData")
        .onSnapshot(function(doc) {
            currentSprint = doc.data().CurrentSprintId;
            console.log(currentSprint);
            selectedSprint = currentSprint;
            setDataIntoDashboard();
        })
}

function setDataIntoDashboard() {

    if (selectedSprint == "-1") {
        selectedDocument = "Backlog";
    } else {
        selectedDocument = "S" + selectedSprint;
    }

    db.collection("Main").doc(selectedDocument).get()
        .then(function(doc) {
            var totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            var totalBusinessTask = doc.data().TotalBusinessTask;
            var totalMarketingTask = doc.data().TotalMarketingTask;
            var startDate = doc.data().StartDate;
            var endDate = doc.data().EndDate;
            var status = doc.data().Status;
            var totalCompletedTask = doc.data().TotalCompletedTask;

            displayDataIntoDashboard(selectedDocument, totalDevelopmentTask, totalBusinessTask, totalMarketingTask, totalCompletedTask, startDate, endDate, status);
            getTasks();
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
}

function displayDataIntoDashboard(selectedDocument, totalDevelopmentTask, totalBusinessTask, totalMarketingTask, totalCompletedTask, startDate, endDate, status) {

    document.getElementById("sprintId").innerHTML = selectedDocument;
    document.getElementById("totalDevelopmentTask").innerHTML = totalDevelopmentTask;
    document.getElementById("totalBusinessTask").innerHTML = totalBusinessTask;
    document.getElementById("totalMarketingTask").innerHTML = totalMarketingTask;
    document.getElementById("totalCompletedTask").innerHTML = totalCompletedTask;
    document.getElementById("sprintStartDate").innerHTML = startDate;
    document.getElementById("sprintEndDate").innerHTML = endDate;
    document.getElementById("sprintStatus").innerHTML = status;

}

function sprintFilter(sprintFilterId) {
    selectedSprint = sprintFilterId;
    setDataIntoDashboard();
}

function getNewSprintId() {
    var newSprintId = "";
    newSprintId = "S" + (currentSprint + 1).toString();
    console.log(newSprintId);
    document.getElementById("SprintNo").innerHTML = newSprintId;
    readSprintData(newSprintId);
}

function readSprintData(newSprintId) {
    db.collection("Main").doc(newSprintId)
        .onSnapshot(function(doc) {
            if (doc.exists) {
                console.log("working");
                console.log(doc.data().TotalDevelopmentTask);
                console.log(doc.data().TotalBusinessTask);
                console.log(doc.data().TotalMarketingTask);
                var totalDevelopmentTask = doc.data().TotalDevelopmentTask;
                var totalBusinessTask = doc.data().TotalBusinessTask;
                var totalMarketingTask = doc.data().TotalMarketingTask;
                document.getElementById("totalDevelopmentTaskNewSprint").innerHTML = totalDevelopmentTask;
                document.getElementById("totalBusinessTaskNewSprint").innerHTML = totalBusinessTask;
                document.getElementById("totalMarketingTaskNewSprint").innerHTML = totalMarketingTask;
            } else {
                document.getElementById("totalDevelopmentTaskNewSprint").innerHTML = 0;
                document.getElementById("totalBusinessTaskNewSprint").innerHTML = 0;
                document.getElementById("totalMarketingTaskNewSprint").innerHTML = 0;
            }
        });
}