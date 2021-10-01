/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { addActivity } = require("../activity/addActivity");
const { getOrgUseAppKey } = require("../organization/lib");
const { getOrgRawData, updateOrgRawData } = require("../organization/lib");
const { getTaskData, getMyDashboardTaskData } = require("./lib");

exports.getMyDashboardData = function(request, response) {
    const email = request.body.data.Email;
    const orgDomain = request.body.data.OrgDomain;
    const sprintNumber = parseInt(request.body.data.SprintNumber);

    let result;
    let status = 200;
    let sprintData;

    const promise1 = getMyDashboardTaskData(orgDomain, sprintNumber, email).then((data) => {
        if (data == undefined) {
            result = { data: { status: "Error", sprintData: undefined } };
        } else {
            sprintData = data;
            console.log("Sprint data defined", data);
            result = { data: { status: "Ok", sprintData: sprintData } };
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    Promises = [promise1];
    return Promise.all(Promises).then(() => {
        return response.status(status).send(result);
    }).catch((error) => {
        result = { data: error };
        console.log("Error  Getting Data", error);
        return response.status(status).send(result);
    });
};