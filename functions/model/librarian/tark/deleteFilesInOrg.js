/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */

const { updateFileToOrg } = require("../lib")
const { getOrg ,getOrgUseAppKey ,updateOrg} = require("../../organization/lib");
const { addActivity } = require("../../activity/tark/addActivity");

exports.deleteFilesInOrg = function(request, response){
  const appKey = request.body.data.AppKey;
  const orgFileDocumentName = request.body.data.OrgFileDocumentName;

  let result;
  let status = 200;

  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
      const orgDomain = orgDetail.OrganizationDomain;
        if (orgDetail == undefined) {
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