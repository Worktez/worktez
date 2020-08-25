function getDashboardData() {
    firestore.collection(collectionName)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
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
        }
    });

}

function sprintFilter(sprintFilterId) {
    dashboardDataset.forEach(element => {
        // console.log(element.sprintId);
        // console.log(sprintFilterId);
        if (parseInt(element.sprintId) == parseInt(sprintFilterId)) {
            document.getElementById("totalDevelopmentTask").innerHTML = element.totalDevelopmentTask;
            document.getElementById("totalBusinessTask").innerHTML = element.totalBusinessTask;
            document.getElementById("totalMarketingTask").innerHTML = element.totalMarketingTask;
        }
        //  else {
        //     console.log("sprint id not found");
        // }
    });
}