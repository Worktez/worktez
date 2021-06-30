/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { db } = require("../application/lib");

exports.updateTheme = function(request, response) {
    const uid = request.body.data.Uid;
    const appTheme = request.body.data.AppTheme;
    let result;

    db.collection("Users").doc(uid).update({
        AppTheme: appTheme,
    }).then(() => {
        result = { data: "User theme updated successfully" };
        console.log("Successful");
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};