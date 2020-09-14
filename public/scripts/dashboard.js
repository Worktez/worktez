function getDashboardData() {
    db.collection(collectionName).get().then(function(doc) {
        console.log(doc.data());
        createDashboardInstance(doc.data());
        currentSprintDashboard();
    });
    return "ok";
}

function getRawData() {
    var newSprintId = "";
    db.collection("Main").doc("RawData").get()
        .then(function(doc) {
            console.log("Sprint: ", doc.data().CurrentSprintId);
            newSprintId = "S" + (doc.data().CurrentSprintId + 1).toString();
            console.log(newSprintId);
            document.getElementById("SprintNo").innerHTML = newSprintId;
            readSprintData(newSprintId);
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
}

function readSprintData(newSprintId) {
    db.collection("Main").doc(newSprintId).get()
        .then(function(doc) {
            console.log(doc.data().TotalDevelopmentTask);
            console.log(doc.data().TotalBusinessTask);
            console.log(doc.data().TotalMarketingTask);
            var totalDevelopmentTask = doc.data().TotalDevelopmentTask;
            var totalBusinessTask = doc.data().TotalBusinessTask;
            var totalMarketingTask = doc.data().TotalMarketingTask;
            document.getElementById("totalDevelopmentTaskNewSprint").innerHTML = totalDevelopmentTask;
            document.getElementById("totalBusinessTaskNewSprint").innerHTML = totalBusinessTask;
            document.getElementById("totalMarketingTaskNewSprint").innerHTML = totalMarketingTask;

        })
        .catch(function(error) {
            console.log("Error", error);
        });
}

function createDashboardInstance(data) {
    var dashboardDataObj = new StoreSprintData(data);
    dashboardDataset.push(dashboardDataObj);
    console.log(data);
}

function currentSprintDashboard() {
    dashboardDataset.forEach((element) => {
        if (element.sprintStatus == "progress") {
            document.getElementById("totalDevelopmentTask").innerHTML = element.totalDevelopmentTask;
            document.getElementById("totalBusinessTask").innerHTML = element.totalBusinessTask;
            document.getElementById("totalMarketingTask").innerHTML = element.totalMarketingTask;
            document.getElementById("totalCompletedTask").innerHTML = element.totalDevelopmentTask + element.totalBusinessTask + element.totalMarketingTask;
            document.getElementById("sprintId").innerHTML = element.sprintId;
            document.getElementById("sprintDetail").innerHTML = element.sprintDetail;
            document.getElementById("sprintStartDate").innerHTML = element.sprintStartDate;
            document.getElementById("sprintEndDate").innerHTML = element.sprintEndDate;
            document.getElementById("sprintEndDate").innerHTML = element.sprintEndDate;
            document.getElementById("sprintStatus").innerHTML = element.sprintStatus;

            getTasks();
        }
    });
}

function sprintFilter(sprintFilterId) {
    dashboardDataset.forEach((element) => {
        if (parseInt(element.sprintId) == parseInt(sprintFilterId)) {
            document.getElementById("totalDevelopmentTask").innerHTML = element.totalDevelopmentTask;
            document.getElementById("totalBusinessTask").innerHTML = element.totalBusinessTask;
            document.getElementById("totalMarketingTask").innerHTML = element.totalMarketingTask;
            document.getElementById("totalCompletedTask").innerHTML = element.totalMarketingTask;
            document.getElementById("totalCompletedTask").innerHTML = element.totalDevelopmentTask + element.totalBusinessTask + element.totalMarketingTask;
            document.getElementById("sprintId").innerHTML = element.sprintId;
            document.getElementById("sprintDetail").innerHTML = element.sprintDetail;
            document.getElementById("sprintStartDate").innerHTML = element.sprintStartDate;
            document.getElementById("sprintEndDate").innerHTML = element.sprintEndDate;
            document.getElementById("sprintEndDate").innerHTML = element.sprintEndDate;
            document.getElementById("sprintStatus").innerHTML = element.sprintStatus;

            getTasks();
        }
    });
}