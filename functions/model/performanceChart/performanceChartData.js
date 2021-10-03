/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, db } = require("../application/lib");

exports.performanceChartData = function(request, response) {
    const data = request.body.data;
    const orgDomain = data.OrganizationDomain;
    const sprintNumber = data.SprintNumber;
    const teamId = data.TeamId;
    const assignee = data.Assignee;
    let status = 200;

    let storyPoint = 0;
    let promise1;

    if (assignee) {
        promise1 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("SprintNumber", "==", sprintNumber).where("TeamId", "==", teamId).where("Assignee", "==", assignee).get().then((docs) => {
            docs.forEach((doc) => {
                const data = doc.data();
                if (data.Status == "Completed") {
                    storyPoint += data.StoryPointNumber;
                }
            });
        }).catch((error) => {
            status = 500;
            console.log(error);
        });
    } else {
        promise1 = db.collection("Organizations").doc(orgDomain).collection("Tasks").where("SprintNumber", "==", sprintNumber).where("TeamId", "==", teamId).get().then((docs) => {
            docs.forEach((doc) => {
                const data = doc.data();
                if (data.Status == "Completed") {
                    storyPoint += data.StoryPointNumber;
                }
            });
        }).catch((error) => {
            status = 500;
            console.log(error);
        });
    }

    return Promise.resolve(promise1).then(() => {
        result = {data: {StoryPoint: storyPoint}};
        console.log("Sent Performance Chart Data Successfully");
        return response.status(status).send(result);
    })
    .catch((error) => {
        result = { data: error };
        return response.status(status).send(result);
    });
};