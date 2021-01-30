const functions = require('firebase-functions');
var cors = require('cors')({ origin: true });

const admin = require('firebase-admin');

const db = admin.firestore();

exports.createNewUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request);
        const user = request.body.data;
        const Uid = user.uid;
        const PhotoURL = user.photoURL;
        const DisplayName = user.displayName;
        const Email = user.email;
        const PhoneNumber = user.phoneNumber;
        const ProviderId = user.providerId;

        db.collection("Users").doc(Uid).get().then((doc) => {
                if (doc.exists) {
                    const userData = db.collection("Users").doc(Uid).update({
                        uid: Uid,
                        photoURL: PhotoURL,
                        displayName: DisplayName,
                        email: Email,
                        phoneNumber: PhoneNumber,
                        providerId: ProviderId
                    });
                    return Promise.resolve(userData);
                } else {
                    const userData = db.collection("Users").doc(Uid).set({
                        uid: Uid,
                        photoURL: PhotoURL,
                        displayName: DisplayName,
                        email: Email,
                        phoneNumber: PhoneNumber,
                        providerId: ProviderId
                    });
                    return Promise.resolve(userData);
                }
            }).then(() => {
                result = { data: "User Logged In Successfully" };
                console.log("Document successfully written");
                return response.status(200).send(result);
            })
            .catch((error) => {
                result = { data: error };
                console.log("error", error);
                return response.status(500).send(result)
            });
    });
});