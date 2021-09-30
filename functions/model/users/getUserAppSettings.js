/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getUser } = require("./lib");

exports.getUserAppSettings = function(request, response) {
    const user = request.body.data;
    const Uid = user.uid;

    let userData;
    let status = 200;
    let result;

    const promise1 = getUser(Uid).then((data) => {
        console.log("Getting User Data");
        if (data == undefined) {
            console.log("User doesn't exist");
            result = { data: {status: "Error", userData: undefined}};
        } else {
            userData = data;
            console.log(userData.AppKey);
            result = { data: {status: "Ok", userData: userData}};
        }
    }).catch((err) => {
        status = 500;
        console.error("Error : " + err);
    });

    Promises = [promise1];
    return Promise.all(Promises).then(() => {
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Getting User Data", error);
            return response.status(status).send(result);
        });
};