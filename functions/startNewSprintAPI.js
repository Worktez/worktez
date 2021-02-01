const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.startNewSprint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.body.data);

        var status = request.body.data.Status;
        var startDate = request.body.data.StartDate;
        var endDate = request.body.data.EndDate;
        var totalDevelopment = parseInt(request.body.data.TotalDevelopment);
        var totalBusiness = parseInt(request.body.data.TotalBusiness);
        var totalMarketing = parseInt(request.body.data.TotalMarketing);
        var totalOther = parseInt(request.body.data.TotalOther);
        var newSprintId = parseInt(request.body.data.NewSprintId);
        var newSprintIdString = "S" + newSprintId.toString();
        var createSprintPromise;
        var result;

        console.log("End Date from Backend: " + endDate);
        console.log("Start Date from Backend: " + startDate);
        console.log("Status from Backend: " + status);

        const p1 = db.collection("Main").doc(newSprintIdString).get().then((doc) => {
            if (doc.exists) {
                createSprintPromise = db.collection("Main").doc(newSprintIdString).update({
                    TotalDevelopmentTask: totalDevelopment,
                    TotalBusinessTask: totalBusiness,
                    TotalMarketingTask: totalMarketing,
                    TotalOtherTask: totalOther,
                    EndDate: endDate,
                    StartDate: startDate,
                    Status: status
                });
            } else {
                var totalUnCompletedTask = 0;
                var totalCompletedTask = 0;
                var totalNumberOfTask = 0;

                createSprintPromise = db.collection("Main").doc(newSprintIdString).set({
                    TotalDevelopmentTask: totalDevelopment,
                    TotalBusinessTask: totalBusiness,
                    TotalMarketingTask: totalMarketing,
                    TotalOtherTask: totalOther,
                    EndDate: endDate,
                    StartDate: startDate,
                    Status: status,
                    TotalUnCompletedTask: totalUnCompletedTask,
                    TotalCompletedTask: totalCompletedTask,
                    TotalNumberOfTask: totalNumberOfTask
                });
            }
            return Promise.resolve(createSprintPromise);
        });
        const p2 = db.collection("RawData").doc("AppDetails").update({
            CurrentSprintId: newSprintId
        });
        const Promises = [p1, p2];
        return Promise.all(Promises).then(() => {
                console.log("Sprint started successfully");
                result = { data: "OK" }
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error }
                console.error("Error Starting Sprint", error);
                return response.status(500).send(result);
            });
    });
});