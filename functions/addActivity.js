const admin = require('firebase-admin');

const db = admin.firestore();


let activityPromise;
let actionId;
let totalActions;
let totalComments;

exports.addActivity = function(type, comment, taskId, date, time) {
    const promise1 = db.collection("Activity").doc(taskId).get().then((doc) => {
        if (doc.exists) {
            totalActions = doc.data().TotalActions + 1;
            totalComments = doc.data().TotalComments + 1;

            actionId = createActivityId(totalActions);
            activityPromise = db.collection("Activity").doc(taskId).update({
                TotalActions: totalActions,
                TotalComments: totalComments,
            });

        } else {
            totalActions = 1;
            totalComments = 1;
            actionId = createActivityId(totalActions);

            activityPromise = db.collection("Activity").doc(taskId).set({
                TaskId: taskId,
                TotalActions: totalActions,
                TotalComments: totalComments
            });
        }
        activityPromise2 = db.collection("Activity").doc(taskId).collection("Action").doc(actionId).set({
            Type: type,
            Comment: comment,
            Date: date,
            Time: time
        });
        const Promises = [activityPromise, activityPromise2];
        return Promise.resolve(Promises);
    });
    return Promise.resolve(promise1).then(() => {
            result = { data: "OK!" }
            console.log("Activity Tracked successfully!");
            return 0;
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Tracking Activity: ", error);
        });
}



function createActivityId(actionId) {
    return ("A" + actionId);
}