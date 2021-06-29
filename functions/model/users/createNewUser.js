/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setApplication, db } = require("../application/lib");
const { setUser } = require("./lib");

exports.createNewUser = function(request, response) {
    const user = request.body.data;
    const Uid = user.uid;
    const PhotoURL = user.photoURL;
    const DisplayName = user.displayName;
    const Email = user.email;
    const PhoneNumber = user.phoneNumber;
    const ProviderId = user.providerId;

    const promise1 = db.collection("Users").doc(Uid).get().then((doc) => {
        if (!doc.exists) {
            return setUser(Uid, PhotoURL, DisplayName, Email, PhoneNumber, ProviderId);
        } else {
            return;
        }
    });
    const promise2 = db.collection("RawData").doc("AppDetails").get().then((doc) => {
        if (doc.exists) {
            return 0;
        } else {
            return setApplication();
        }
    });
    const Promises = [promise1, promise2];
    let result;
    return Promise.all(Promises).then(() => {
            result = { data: "User Logged In Successfully" };
            console.log("User Logged In Successfully");
            return response.status(200).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error LogIn/SignUp User", error);
            return response.status(500).send(result);
        });
};