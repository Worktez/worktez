/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
const { functions, getApplicationData, updateApplication, generateBase64String } = require("../application/lib");
const { setOrg, getOrg, getOrgRawData, setOrgRawData } = require("./lib");
const { setMyOrgCollection, getMyOrgCollection, getUser, updateUser } = require("../users/lib");

exports.createOrg = functions.https.onRequest((request, response) => {
    const data = request.body.data;
    const date = new Date();
    const orgId = generateBase64String(date.toString());
    const appKey = generateBase64String(date.getMilliseconds() + orgId);

    const organizationName = data.OrganizationName;
    const orgDomain = data.OrganizationDomain;
    const orgEmail = data.OrganizationEmail;
    const orgAdmin = data.OrganizationAdmin;
    const orgAdminUid = data.OrganizationAdminUid;
    const orgDescription = data.OrganizationDescription;
    const orgLogoURL = data.OrganizationLogoURL;
    const securityPhrase = generateBase64String(orgId + appKey + organizationName + date.getMilliseconds() + date.getDay());

    let status = 200;

    const promise1 = getOrg(orgDomain).then((orgDoc) => {
        if (orgDoc == undefined) {
            setOrg(orgDomain, orgId, appKey, securityPhrase, organizationName, orgEmail, orgAdmin, orgDescription, orgLogoURL);
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise2 = getOrgRawData(orgDomain).then((orgRawData) => {
        if (orgRawData == undefined) {
            setOrgRawData(orgDomain);

            const p2 = getApplicationData().then((appData) => {
                const totalNumberOfOrganizations = appData.TotalNumberOfOrganizations;

                const appDetailsUpdateJson = {
                    TotalNumberOfOrganizations: totalNumberOfOrganizations + 1,
                };

                updateApplication(appDetailsUpdateJson);
            }).catch((error) => {
                status = 500;
                console.log("Error:", error);
            });

            return Promise.resolve(p2);
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise3 = getMyOrgCollection(orgAdminUid, orgDomain).then((orgDoc) => {
        if (orgDoc == undefined) {
            setMyOrgCollection(orgAdminUid, orgDomain, appKey);
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise4 = getUser(orgAdminUid).then((userDoc) => {
        const selectedAppKey = appKey;
        const userUpdateJson = {
            SelectedOrgAppKey: selectedAppKey,
        };
        updateUser(userUpdateJson, orgAdminUid);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    let result;
    const promises = [promise1, promise2, promise3, promise4];
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