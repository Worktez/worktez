/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */

const { updateFileToTask } = require("../lib");
const { updateFileToOrg } = require("../lib")
const { getOrg } = require("../../organization/lib");
const { getOrgUseAppKey } = require("../../organization/lib");
const { addActivity } = require("../../activity/tark/addActivity");
const {updateOrg } = require("../../organization/lib");

exports.deleteFilesInOrg = function(request, response){
  const fileName = request.body.data.FileName;
  const appKey = request.body.data.AppKey;
  const uid = request.body.data.Uid;
  const fileUrl = request.body.data.FileUrl;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const orgFileDocumentName = request.body.data.OrgFileDocumentName;

  let result;
  let status = 200;

  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
      const orgDomain = orgDetail.OrganizationDomain;

      const promise1 = getOrg(orgDomain).then((orgDoc) => {
        if (orgDoc == undefined) {
            result = {data: {status: "ERROR"}};
          } else {
            const updateOrgFileJson = {
              FileStatus: "DELETED",
            };
         updateFileToOrg(updateOrgFileJson, orgDomain, orgFileDocumentName);  
        } 
      }).catch((error) => {
        status = 500;
        console.log("Error:", error);
      }); 
      return Promise.resolve(promise1);
  });

  Promise.resolve(promise).then(() => {
      result = { data: {status: "OK"} };
      console.log("File Deleted Successfully");
      return response.status(status).send(result);
  })
      .catch((error) => {
          result = {data: error};
          console.error("Error Deleting", error);
          return response.status(status).send(result);
      });

}