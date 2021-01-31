const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.activityCollectionPatch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        var id;
        var result;
        var p1 = db.collection("Tasks").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                id = doc.data().Id;
                console.log(id);
                db.collection("Activity").doc(id).set({
                        TaskId: id,
                        TotalActions: 0,
                        TotalComments: 0
                    }).then(() => {
                        result = { data: "It has worked!" }
                        console.log("Document successfully written!");
                        return response.status(200).send(result);
                    })
                    .catch(function(error) {
                        result = { data: error };
                        console.error("Error writing document: ", error);
                        return response.status(500).send(result)
                    });
            });
            return Promise.resolve(p1);
        });
    });
})