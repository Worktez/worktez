function getDashboardData() {
    db.collection(Main)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    console.log(change.doc.data());
                    createDashboardInstance(change.doc.data());
                }
                if (change.type === "modified") {
                    console.log('modified');
                    // updateDashboard(change.doc.data());
                }
            });
            currentSprintDashboard();
        });
    return "ok";
}


function createDashboardInstance(data) {
    var dashboardDataObj = new StoreSprintData(data);
    dashboardDataset.push(dashboardDataObj);
    console.log(data);
}

function currentSprintDashboard() {
    dashboardDataset.forEach(element => {
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
    dashboardDataset.forEach(element => {
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