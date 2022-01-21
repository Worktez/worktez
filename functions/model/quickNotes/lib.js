/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.getNotes = function(Uid) {
    let query = db.collection("Users").doc(Uid).collection("QuickNotes");

    query = query.where("Status", "==", "OK");

    const promise = query.get().then((doc) => {
        const data=[];
        doc.forEach((element) => {
            if (element.exists) {
                data.push( element.data());
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};
exports.addUserNote = function(uid, title, note, docId, lastUpdatedDate, lastUpdatedTime) {
    const addNotePromise = db.collection("Users").doc(uid).collection("QuickNotes").doc(docId).set({
        Title: title,
        Note: note,
        DocId: docId,
        LastUpdatedDate: lastUpdatedDate,
        LastUpdatedTime: lastUpdatedTime,
        Status: "OK",
    });
    return Promise.resolve(addNotePromise);
};
exports.deleteUserNote = function(uid, docId) {
    const updateNoteToJson = db.collection("Users").doc(uid).collection("QuickNotes").doc(docId).set({
        DocId: docId,
        Status: "OK",
    });
    return Promise.resolve(updateNoteToJson);
};