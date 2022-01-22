/* eslint-disable linebreak-style */
/* eslint-disable  object-curly-spacing*/
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getTask, updateTask } = require("../../tasks/lib");
const { setLinkDoc } = require("../lib")


exports.setLinkDetails = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const taskId = request.body.data.TaskID;
    const linkType = request.body.data.LinkType;
    const linkURL = request.body.data.LinkURL;


    let status = 200;
    let result;

    const promise = getTask(taskId, orgDomain).then((taskDetail) => {
        if (taskDetail == undefined) {
            result = {data: {status: "ERROR"}};
        } else {
            const linkCounter = taskDetail.LinkCounter + 1;
            const linkId= "Link"+(linkCounter);
            setLinkDoc(orgDomain, taskId, linkType, linkURL, linkId);
            const inputJson = {
                LinkCounter: linkCounter,
            };
            updateTask(inputJson, orgDomain, taskId);
        }
    }).catch((error) => {
        status = 500;
        console.error("Error:", error);
    });
    Promise.resolve(promise).then(() => {
        result = { data: {status: "OK"} };
        console.log("Link Added Successfully");
        return response.status(status).send(result);
    })
    .catch((error) => {
        result = { data: error };
        console.error("Error Adding Link", error);
        return response.status(status).send(result);
    });
};