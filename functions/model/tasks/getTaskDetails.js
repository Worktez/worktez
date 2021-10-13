/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getTask } = require("./lib");

exports.getTaskDetails = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const taskId = request.body.data.Id;
  let result;
  let status = 200;
  
  const p1 = getTask(taskId, orgDomain).then((taskDoc) => {
    if (taskDoc == undefined) {
      result = {data: {status: "ERROR", taskData: undefined}};
    } else {
      result = {data: {status: "OK", taskData: taskDoc}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(p1).then(() => {
    console.log("Fetched Task Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Task", error);
    return response.status(status).send(result);
  });
};
