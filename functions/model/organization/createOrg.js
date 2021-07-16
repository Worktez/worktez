/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
const { functions } = require("../application/lib");

const { setOrg } = require("./lib");
const { getOrg } = require("./lib");

function generateBase64String(temp) {
    return Buffer.from(temp).toString("base64");
}

exports.createOrg = functions.https.onRequest((request, response) => {
    const data = request.body.data;
    const date = new Date();
    const orgId = generateBase64String(date.toString());
    const appKey = generateBase64String(date.getMilliseconds() + orgId);

    const organizationName = data.OrganizationName;
    const orgDomain = data.OrganizationDomain;
    const orgEmail = data.OrganizationEmail;
    const orgDescription = data.OrganizationDescription;
    const orgLogoURL = data.OrganizationLogoURL;
    const securityPhrase = generateBase64String(orgId + appKey + organizationName + date.getMilliseconds() + date.getDay());

    let status = 200;

    const promise1 = getOrg(orgDomain).then((orgDoc) => {
        if (orgDoc == undefined) {
            setOrg(orgDomain, orgId, appKey, securityPhrase, organizationName, orgEmail, orgDescription, orgLogoURL);
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });
    // promise-2 to set/update organization RawData
    let result;
    const promises = [promise1];
    return Promise.all(promises).then(() => {
            const arr = ["Created Organization Successfully", appKey];
            result = { data: arr };
            console.log("Created Organization Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Creating Organization", error);
            return response.status(status).send(result);
        });
});