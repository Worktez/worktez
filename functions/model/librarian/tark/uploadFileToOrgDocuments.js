/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { setFileToOrgDocument } = require("../lib");
const { getOrgUseAppKey, updateOrg } = require("../../organization/lib");

exports.uploadFileToOrgDocuments = function(request, response) {
  const fileName = request.body.data.FileName;
  const fileUrl = request.body.data.FileUrl;
  const lastModified = request.body.data.LastModified;
  const size = request.body.data.Size;
  const appKey = request.body.data.AppKey;
  const uid = request.body.data.Uid;
  const date = request.body.data.Date;
  const time = request.body.data.Time;
  const basePath = request.body.data.BasePath;

  let result;
  let status = 200;
  
  const promise = getOrgUseAppKey(appKey).then((orgDetail) => {
    const orgDomain = orgDetail.OrganizationDomain;
    const orgId = orgDetail.OrganizationId;
    let filesCounter = orgDetail.FilesCounter;
    filesCounter++;
    
    const orgFileDocumentName = "File"+filesCounter;
    const updateOrgFileJson = {
      FileName: fileName,
      FileUrl: fileUrl,
      LastModified: lastModified,
      Size: size,
      Uid: uid,
      Date: date,
      Time: time,
      OrgId: orgId,
      OrgFileDocumentName: orgFileDocumentName,
      BasePath: basePath,
      FileStatus: "OK",
    };
    setFileToOrgDocument(updateOrgFileJson, orgDomain, orgFileDocumentName);

    const updateOrgForCounter = {
      FilesCounter: filesCounter,
    };

    updateOrg(orgDomain, updateOrgForCounter);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = { data: {status: "OK"} };
    console.log("File Uploaded Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = { data: error };
        console.error("Error Uploading", error);
        return response.status(status).send(result);
      });
};
