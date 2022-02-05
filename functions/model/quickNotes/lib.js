/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

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

exports.getNote = function(Uid, docId) {
    let query = db.collection("Users").doc(Uid).collection("QuickNotes");

    query = query.where("DocId", "==", docId);

    const promise = query.get().then((doc) => {
        let data;
        doc.forEach((element) => {
            if (element.exists) {
                data = element.data();
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

exports.deleteUserNote = function(updateNoteToJson, uid, docId) {
    const deleteNotePromise = db.collection("Users").doc(uid).collection("QuickNotes").doc(docId).update(updateNoteToJson);
    return Promise.resolve(deleteNotePromise);
};

exports.updateNote = function(inputJson, uid, docId) {
    const editNotePromise = db.collection("Users").doc(uid).collection("QuickNotes").doc(docId).update(inputJson);
    return Promise.resolve(editNotePromise);
};