/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { db } = require("../application/lib");

exports.updateUser = function(request, response) {
    const uid = request.body.data.Uid;
    const displayName = request.body.data.DisplayName;
    const aboutMe = request.body.data.AboutMe;
    let result;

    db.collection("Users").doc(uid).update({
        displayName: displayName,
        AboutMe: aboutMe,
    }).then(() => {
        result = { data: "User Profile updated successfully" };
        console.log("Successful");
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};