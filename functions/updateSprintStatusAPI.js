const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.updateSprintStatus = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var sprintStatus = request.body.data.SprintStatus;
        var currentSprintName = request.body.data.CurrentSprintName;
        console.log(currentSprintName);
        db.collection("Main").doc(currentSprintName).update({
            Status: sprintStatus,
        });
    });
})
