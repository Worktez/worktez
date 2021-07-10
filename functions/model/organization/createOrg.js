/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
const { functions, db } = require("../application/lib");

const {setOrg} = require("./lib");
const {getOrg} = require("./lib");

function generateBase64String(temp) {
  return Buffer.from(temp).toString("base64");
}

exports.createNewOrganization = functions.https.onRequest((request, response) => {
  const data = request.body.data;
  const date = new Date();
  const orgId = generateBase64String(date.toString());
  const appKey = generateBase64String(date.getMilliseconds() + organizationId);

  const orgName = data.OrganizationName;
  const orgDomain = data.OrganizationDomain;
  const orgEmail = data.OrganizationEmail;
  const orgDescription = data.OrganizationDescription;
  const orgLogoURL = data.OrganizationLogoURL;
  const securityPhrase = generateBase64String(organizationId + appKey + organizationName + date.getMilliseconds() + date.getDay());

  const promise1 = getOrg(orgDomain).then((doc) => {
    if (!doc.exists) {
      return setOrg(orgDomain, orgId, appKey, securityPhrase, orgName, orgEmail, orgDescription, orgLogoURL);
    } else {
      return 0;
    }
  });
  // promise-2 to set/update organization RawData
  let result;
  const promises = [promise1];
  return Promise.all(promises).then(() => {
    const arr = ["Created Organization Successfully", appKey];
    result = { data: arr };
    console.log("Created Organization Successfully");
    return response.status(200).send(result);
  })
  .catch((error) => {
    result = { data: error };
    console.error("Error Creating Organization", error);
    return response.status(500).send(result);
  });
});
