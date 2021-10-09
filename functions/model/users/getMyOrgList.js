/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { getMyOrgCollection } = require("./lib");

exports.getMyOrgList = function(request, response) {
    const uid = request.body.data.Uid;

    let status = 200;
    let resultData = [];

    const promise1 = getMyOrgCollection(uid).then((snapshot) => {
        if (snapshot == undefined) {
            result = { data: {status: "Not Found", data: "No Organization Listed"} };
        } else {
            snapshot.forEach(element => {
                let data = element.data();
                data['OrgDomain'] = element.id;
                resultData.push(data);
            });
            result = { data: {status: "Ok", data: resultData} };
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
            console.error("Error in Getting MyOrganizations", error);
            return response.status(status).send(result);
        });
};