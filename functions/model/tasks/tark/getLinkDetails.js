/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getLink } = require("../lib");

exports.getLinkDetails = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const taskId = request.body.data.TaskId;

  let result;
  const resultData = [];
  let status = 200;
  
  const promise = getLink(orgDomain, taskId).then((linkDoc) => {
    if (linkDoc == undefined) {
      result = {data: {status: "OK", data: "No Links Available"}};
    } else {
      linkDoc.forEach((element) => {
        const data = element.data();
        resultData.push(data);
      });
      result = {data: {status: "OK", data: resultData}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(promise).then(() => {
    console.log("Fetched Link Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Link", error);
    return response.status(status).send(result);
  });
};
