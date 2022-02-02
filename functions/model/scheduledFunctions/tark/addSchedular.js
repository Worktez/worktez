/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
const { functions, getApplicationData, updateApplication } = require("../../application/lib");
const { setSchedular } = require("../lib");

exports.addSchedularOrg = functions.https.onRequest((request, response) => {
    const data = request.body.data;
    const type = data.Type;
    const orgAppKey = data.OrgAppKey;
    const assignee = data.Assignee;
    const teamId = data.TeamId;
    const orgDomain = data.OrgDomain;

    let status = 200;

    const promise1 = getApplicationData().then((appData) => {
        const totalNumberOfSchedularOrg = appData.TotalNumberSchedularOrg + 1;
            const appDetailsUpdateJson = {
                TotalNumberSchedularOrg: totalNumberOfSchedularOrg,
            };

            const schedularDocId = "so" + totalNumberOfSchedularOrg;

            setSchedular(schedularDocId, type, orgAppKey, assignee, teamId, orgDomain, "","",0,0);

            updateApplication(appDetailsUpdateJson);
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });

    let result;
    const promises = [promise1];
    return Promise.all(promises).then(() => {
            const arr = ["Created Schedular Successfully"];
            result = { data: arr };
            console.log("Created Schedular Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Schedular", error);
            return response.status(status).send(result);
        });
});