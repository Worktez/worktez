/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAllUsersInUids } = require("../lib");

exports.getUserByUid = function(request, response) {
    const uids = request.body.data.Uid;
    let userData = [];
    let status = 200;
    let result;
    const Promises = [];

    while (uids.length > 0) {
        let temp;

        if (uids.length > 10) {
            temp = uids.slice(0, 10);
        } else {
            temp = uids.slice(0, uids.length);
        }

        const promise = getAllUsersInUids(temp).then((data) => {
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

        if (uids.length > 10) {
            uids.splice(0, 10);
        } else {
            uids.splice(0, uids.length);
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