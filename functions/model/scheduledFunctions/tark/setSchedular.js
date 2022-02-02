/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const admin = require("firebase-admin");
// const db = admin.firestore();

const { getApplicationData, updateApplication } = require("../../application/lib");
const { setSchedular, getAllSchedular } = require("../lib");

exports.setSchedularUnit = function(type, orgAppKey, assignee, teamId, orgDomain, sprintStatus, newSprintIdString, startDate, endDate) {
    getApplicationData().then((appData) => {
        const totalNumberOfSchedularOrg = appData.TotalNumberSchedularOrg + 1;
        const appDetailsUpdateJson = {
            TotalNumberSchedularOrg: totalNumberOfSchedularOrg,
        };

        const schedularDocId = "so" + totalNumberOfSchedularOrg;

        getAllSchedular().then((data)=>{
            if (data.docs.length != 0) {
                data.docs.forEach((element) => {
                    console.log(element.data());
                    console.log(type, orgAppKey, assignee, teamId, orgDomain);
                    console.log(assignee, "==", element.data().Assignee);
                    if (type == element.data().Type && orgAppKey == element.data().OrgAppKey && assignee == element.data().Assignee && teamId == element.data().TeamId && orgDomain == element.data().OrgDomain) {
                        console.log("Already exsisting result");
                    } else {
                        setSchedular(schedularDocId, type, orgAppKey, assignee, teamId, orgDomain, sprintStatus, newSprintIdString, startDate, endDate);
                    }
                });
            } else {
                setSchedular(schedularDocId, type, orgAppKey, assignee, teamId, orgDomain, sprintStatus, newSprintIdString,startDate, endDate);
            }
        });

        updateApplication(appDetailsUpdateJson);
    }).catch((error) => {
        console.log("Error:", error);
    });
};