/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getUserUseEmail } = require("./lib");

exports.getUserByEmail = function(request, response) {
    const email = request.body.data.Email;
    let userData;
    let status = 200;
    let result;

    const promise1 = getUserUseEmail(email).then((data) => {
        if (data == undefined) {
            console.log("User doesn't exist");
            result = { data: { status: "Ok", userData: undefined } };
        } else {
            userData = data;
            result = { data: { status: "Ok", userData: userData } };
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