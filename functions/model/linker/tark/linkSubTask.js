/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */


const { updateTask, getTask } = require("../../tasks/lib");
const { setLinkDoc } = require("../lib")

exports.linkSubtask = function(parentTaskId, childTaskId, orgDomain, relationship, parentTaskUrl, childTaskUrl) {

    let status = 200

    const promise1 = getTask(parentTaskId, orgDomain).then((taskDetail) => {
        if (taskDetail == undefined) {
            result = {data: {status: "ERROR"}};
        } else {
            const linkCounter = taskDetail.LinkCounter + 1;
            const linkId= "Link"+(linkCounter);
            setLinkDoc(orgDomain, parentTaskId, "child", childTaskUrl, linkId);
            const inputJson = {
                LinkCounter: linkCounter,
            };
            updateTask(inputJson, orgDomain, parentTaskId);
        }
    }).catch((error) => {
        status = 500;
        console.error("Error:", error);
    });

    const promise2 = getTask(childTaskId, orgDomain).then((taskDetail) => {
        if (taskDetail == undefined) {
            result = {data: {status: "ERROR"}};
        } else {
            const linkCounter = taskDetail.LinkCounter + 1;
            const linkId= "Link"+(linkCounter);
            setLinkDoc(orgDomain, childTaskId, "parent", parentTaskUrl, linkId);
            const inputJson = {
                LinkCounter: linkCounter,
            };
            updateTask(inputJson, orgDomain, childTaskId);
        }
    }).catch((error) => {
        status = 500;
        console.error("Error:", error);
    });

    const promises = [promise1, promise2];
        return Promise.all(promises).then(()=>{
            console.log("Links set successfully!")
        }).catch((error) => {
            status = 500;
            console.log("Error:", error);
        });

   
}
