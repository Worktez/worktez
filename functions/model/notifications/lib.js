/* eslint-disable valid-jsdoc */
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
const { getUser, updateUser, getMyOrgCollectionDoc, updateMyOrgCollection } = require("../users/lib");

/**
 * Description
 * @param {any} notificationMessage
 * @param {any} uid
 * @param {any} date
 * @param {any} time
 * @param {any} orgDomain
 * @param {any} link
 * @return {any}
 */
exports.sendNotification = function(notificationMessage, uid, date, time, orgDomain, link) {
    const status = 1;
    let notificationId = 0;

    const promise1 = getUser(uid, "").then((data) => {
        if (data != undefined) {
            notificationId = data.Notification + 1;
            const inputJson = {
                Notification: notificationId,
            };
            updateUser(inputJson, uid);
            const addNotificationPromise = db.collection("Users").doc(uid).collection("Notifications").doc(notificationId.toString()).set({
                Message: notificationMessage,
                CreationDate: date,
                CreationTime: time,
                OrgDomain: orgDomain,
                Status: status,
                NotificationId: notificationId,
                Link: link,
                LastSeen: "",
            });
            return Promise.resolve(addNotificationPromise);
        }
    }).catch((err) => {
        console.error(err);
        return err;
    });

    const promise2 = getMyOrgCollectionDoc(uid, orgDomain).then((data) => {
        if (data != undefined) {
            const activeNotifications = data.ActiveNotifications + 1;
            const inputJson = {
                ActiveNotifications: activeNotifications,
            };
            updateMyOrgCollection(inputJson, uid, orgDomain);
        }
    }).catch((err) => {
        console.error(err);
        return err;
    });

    const promises = [promise1, promise2];

    Promise.all(promises).then(() => {
        console.log("Notification Updated successfully");
        return;
    }).catch((err) => {
        console.error(err);
        return err;
    });
};

/**
 * Description
 * @param {any} Uid
 * @param {any} orgDomain
 * @param {any} startId
 * @param {any} endId
 * @return {any}
 */
exports.getNotifications = function(Uid, orgDomain, status, startId, endId) {
    let query = db.collection("Users").doc(Uid).collection("Notifications");

    query = query.where("OrgDomain", "==", orgDomain);
    query = query.where("Status", "==", status);

    if (startId != "") {
        query = query.where("NotificationId", ">=", startId);
    }

    if (endId != "") {
        query = query.where("NotificationId", "<=", endId);
    }

    const promise = query.get().then((docs) => {
        const notifications = [];
        docs.forEach((element) => {
            if (element.exists) {
                notifications.push(element.data());
            }
        });
        return notifications;
    });

    return Promise.resolve(promise);
};

exports.updateNotifications = function(inputJson, uid, notificationId) {
    const updateNotificationPromise = db.collection("Users").doc(uid).collection("Notifications").doc(notificationId.toString()).update(inputJson);
    return Promise.resolve(updateNotificationPromise);
};

/**
 * Description
 * @param {any} uid
 * @param {any} orgDomain
 * @return {any}
 */
exports.emptyActiveNotification = function(uid, orgDomain) {
    getMyOrgCollectionDoc(uid, orgDomain).then((data) => {
        if (data != undefined) {
            const activeNotifications = 0;
            const inputJson = {
                ActiveNotifications: activeNotifications,
            };
            updateMyOrgCollection(inputJson, uid, orgDomain);
            return;
        }
    }).catch((err) => {
        console.error(err);
        return err;
    });
};