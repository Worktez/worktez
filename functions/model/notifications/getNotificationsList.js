/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getNotifications, emptyActiveNotification } = require("./lib");

exports.getNotificationsList = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const uid = request.body.data.Uid;

    let status = 200;
    let result;
    getNotifications(uid, orgDomain, "", "").then((doc) => {
        emptyActiveNotification(uid, orgDomain);
        result = { data: doc };
        console.log("Sent notifications successfully");
        return response.status(status).send(result);
    }).catch((error)=>{
        status = 500;
        const result = { data: error };
        console.error("Error getting notifications", error);
        return response.status(status).send(result);
    });
};