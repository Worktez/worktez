/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { updateTask, getAllTasks } = require("../tasks/lib");
const { updatePatchData } = require("./lib");

exports.patch2 = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    let taskId;
    const newfield = request.body.data.newField;
    const newFieldValue = request.body.data.NewFieldValue;
    const newFieldValueType = request.body.data.NewFieldValueType;
    const uid = request.body.data.Uid;
    const promise1 = getAllTasks(orgDomain).then((task) => {
        task.forEach((doc) => {
            taskId = doc.data().Id;
            data = {};
            if (newFieldValueType == "Array") {
                data[newfield] = [];
            } else if (newFieldValueType == "String") {
                data[newfield] = newFieldValue;
            } else if (newFieldValueType == "Number") {
                data[newfield] = Number(newFieldValue);
            }
            updateTask(data, orgDomain, taskId);
        });
        const Promises = [promise1];
        Promise.all(Promises).then(() => {
            result = { data: "OK! Patch2 executed" };
            updatePatchData("Patch2", { LastUsedByUid: uid, LastUsedByOrg: orgDomain });
            console.log("Patch2 executed successfully");
            return response.status(200).send(result);
        }).catch(function(error) {
            result = { data: error };
            console.error("Patch2 error in updating all tasks", error);
            return response.status(500).send(result);
        });
    });
};