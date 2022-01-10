/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllUsersInEmail } = require("../lib");

exports.getUserByEmail = function(request, response) {
    const emails = request.body.data.Email;
    let userData = [];
    let status = 200;
    let result;
    const Promises = [];

    while (emails.length > 0) {
        let temp;

        if (emails.length > 10) {
            temp = emails.slice(0, 10);
        } else {
            temp = emails.slice(0, emails.length);
        }

        const promise = getAllUsersInEmail(temp).then((data) => {
            if (data == undefined) {
                console.log("Users doesn't exist");
                result = { data: { status: "Ok", userData: undefined } };
            } else {
                userData = userData.concat(data);
            }
        }).catch((err) => {
            status = 500;
            console.error("Error : " + err);
        });

        Promises.push(promise);

        if (emails.length > 10) {
            emails.splice(0, 10);
        } else {
            emails.splice(0, emails.length);
        }
    }

    return Promise.all(Promises).then(() => {
        result = { data: { status: "Ok", userData: userData } };
        return response.status(status).send(result);
    })
    .catch((error) => {
        result = { data: error };
        console.error("Error Getting User Data", error);
        return response.status(status).send(result);
    });
};