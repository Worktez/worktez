const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.addCompletionDatePatch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        const completionDate = request.body.data.CompletionDate;
        let id;
        let result;
        let p1 = db.collection("Tasks").get().then((task) => {
                task.forEach((doc) => {
                    id = doc.data().Id;
                    console.log(id);
                    db.collection("Tasks").doc(id).update({
                            CompletionDate: completionDate
                        }).then(() => {
                            result = { data: "It has worked!" }
                            console.log("Patch succesfully completed!");
                            return response.status(200).send(result);
                        })
                        .catch(function(error) {
                            result = { data: error };
                            console.error("Patch error in writing creation date: ", error);
                            return response.status(500).send(result)
                        });
                });
                return Promise.resolve(p1);
            })
            .catch(function(error) {
                result = { data: error };
                console.error("Patch error in getting tasks: ", error);
                return response.status(500).send(result)
            });
    });
})