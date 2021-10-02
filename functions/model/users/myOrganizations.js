/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { getMyOrgCollection, setMyOrgCollection, updateMyOrgCollection } = require("./lib");

exports.myOrganizations = function(uid, orgDomain, orgAppKey, teamId) {
    let status = 200;

    const promise1 = getMyOrgCollection(uid, orgDomain).then((orgDoc) => {
        if (orgDoc == undefined) {
            setMyOrgCollection(uid, orgDomain, orgAppKey, teamId, teamId);
            result = { data: "MyOrganizations Created Successfully" };
        } else {
            const teams= orgDoc.Teams;
            teams.push(teamId);
            let defaultTeam;
            let updateJson = {
                Teams: teams,
            };
            if (teams.length==1) {
                defaultTeam = teamId;
                updateJson = {
                    Teams: teams,
                    DefaultTeam: defaultTeam,
                };
            }
            updateMyOrgCollection(updateJson, uid, orgDomain);
            result = { data: "MyOrganizations Updated Successfully" };
            console.log("MyOrganizations Updated Successfully");
        }
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error in MyOrganizations", error);
            return response.status(status).send(result);
        });
};