/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { addUserNote } = require("../lib");
const { getUser, updateUser } = require("../../users/lib");

exports.addNote = function(request, response) {
    const uid = request.body.data.Uid;
    const title = request.body.data.Title;
    const note = request.body.data.Note;
    const lastUpdatedDate = request.body.data.LastUpdatedDate;
    const lastUpdatedTime = request.body.data.LastUpdatedTime;

    // const displayName = request.body.data.DisplayName;
    // const email = request.body.data.Email;


    let result;
    let status = 200;


    const promise1 = getUser(uid, "").then((userData) => {
        let docId = "";
        if (userData) {
            let notecounter=userData.NoteCounter;
            notecounter = notecounter+1;
            docId= "q" + notecounter;

            updateUserInputJson = {
                NoteCounter: notecounter,
            };
            updateUser(updateUserInputJson, uid);

            addUserNote(uid, title, note, docId, lastUpdatedDate, lastUpdatedTime).then((notesData) => {
                console.log("Successful");
            }).catch((error) => {
                result = { data: error };
                status = 500;
                console.error("Error", error);
            });
        }
});

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
        result = { data: "User Note updated successfully" };
        return response.status(status).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error adding Note", error);
        return response.status(status).send(result);
    });
};