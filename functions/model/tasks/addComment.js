/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { addActivity } = require("../activity/addActivity");
const { getOrgUseAppKey } = require("../organization/lib");

exports.addComment = function(request, response) {
    const appKey = request.body.data.AppKey;
    const taskId = request.body.data.LogTaskId;
    const logWorkComment = request.body.data.LogWorkComment;
    const date = request.body.data.Date;
    const time = request.body.data.Time;
    const uid = request.body.data.Uid;
    const promises = [];
    let status = 200;
    let result;

    const logWorkPromise = getOrgUseAppKey(appKey).then((orgDetails) => {
        const orgDomain = orgDetails.OrganizationDomain;

        addActivity("COMMENT", logWorkComment, taskId, date, time, orgDomain, uid);
        Promise.resolve(promises).then(() => {
                result = { data: "Logged Work successfully!" };
                console.log("Logged Work successfully!");
                return response.status(status).send(result);
            })
            .catch((error) => {
                status = 500;
                const result = { data: error };
                console.error("Error Logging Work", error);
                return response.status(status).send(result);
            });
    });
    return Promise.resolve(logWorkPromise);
};