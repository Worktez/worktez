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
    const resultData = [];
    let result;

    getMyOrgCollection(uid).then((snapshot) => {
        if (snapshot == undefined) {
            result = { data: {status: "Not Found", data: "No Organization Listed"} };
        } else {
            snapshot.forEach((element) => {
                const data = element.data();
                data["OrgDomain"] = element.id;
                resultData.push(data);
            });
            result = { data: {status: "Ok", data: resultData} };
        }
        return response.status(status).send(result);
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
        result = { data: {status: "Error", data: "No Organization Listed"}};
        return response.status(status).send(result);
    });
};