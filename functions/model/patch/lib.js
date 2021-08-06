const admin = require("firebase-admin");
const db = admin.firestore();


exports.setPatches = function() {
    let documentName;
    let inputJson;

    for (var i = 1; i <= 3; i++) {
        documentName = "Patch" + i;

        if (i == 1) {
            inputJson = {
                Name: "Counter Fix",
                Description: "This patch Fixes all the counters for the team",
                CreationDate: "16/06/2021",
                UpdatedOn:  "6/8/2021"
            }
        } else if (i == 2) {
            inputJson = {
                Name: "Patch" + i,
                Description: "This patch adds a new field to all the tasks with a default value.",
                CreationDate: "18/07/2021",
                UpdatedOn:  "6/8/2021"
            }
        } else if (i == 3) {
            inputJson = {
                Name: "Patch" + i,
                Description: "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details",
                CreationDate: "07/07/2021",
                UpdatedOn:  "6/8/2021"
            }
        }
        inputJson.LastUsedByOrg = "";
        inputJson.LastUsedByUid = "";
        setPatch(documentName, inputJson);
    }
}

function setPatch (documentName, inputJson) {
    const promise = db.collection("Patches").doc(documentName).get().then(doc => {
        if (doc.exists) {
            return 0;
        } else {
            const p1 = db.collection("Patches").doc(documentName).set(inputJson);
            return Promise.resolve(p1);
        }
    });
    return Promise.resolve(promise);
}

exports.updatePatchData = function(documentName, updateJson) {
    const promise = db.collection("Patches").doc(documentName).update(updateJson);
    return Promise.resolve(promise);
}