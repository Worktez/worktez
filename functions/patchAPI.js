/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();

exports.patch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        const completionDate = request.body.data.CompletionDate;
        let id;
        let result;
        const p1 = db.collection("Tasks").get().then((task) => {
                task.forEach((doc) => {
                    id = doc.data().Id;
                    console.log(id);
                    db.collection("Tasks").doc(id).update({
                            CompletionDate: completionDate,
                        }).then(() => {
                            result = { data: "It has worked!" };
                            console.log("Patch succesfully completed!");
                            return response.status(200).send(result);
                        })
                        .catch(function(error) {
                            result = { data: error };
                            console.error("Patch error in writing creation date: ", error);
                            return response.status(500).send(result);
                        });
                });
                return Promise.resolve(p1);
            })
            .catch(function(error) {
                result = { data: error };
                console.error("Patch error in getting tasks: ", error);
                return response.status(500).send(result);
            });
    });
});