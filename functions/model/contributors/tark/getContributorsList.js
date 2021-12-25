/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getContributors } = require("../lib");

exports.getContributorsList = function(request, response) {
    let status = 200;
    let result;

    getContributors().then((doc) => {
        result = { data: doc };
        console.log("Sent contributors successfully");
        return response.status(status).send(result);
    }).catch((error)=>{
        status = 500;
        const result = { data: error };
        console.error("Error getting contributors", error);
        return response.status(status).send(result);
    });
};