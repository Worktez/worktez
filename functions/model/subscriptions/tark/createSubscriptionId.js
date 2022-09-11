const {getApplicationData, updateApplication, generateBase64String, milliSeconds} = require("../../application/lib");

exports.createSubscriptionId = function(request, response) {
    const uid = request.body.data.Uid;
    console.log(uid);
    let status = 200;
    let result;

    const promise1 = getApplicationData().then((data) => {
        const subscriptionId = generateBase64String( milliSeconds+uid);
        // setSubscription(subscriptionId, uid);
        result = {data: {status: "OK", data: subscriptionId}};
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const promise = [promise1];
    Promise.all(promise).then(() => {
        console.log("Created Subscription Succesfully");
        return response.status(status).send(result);
    }).catch((error) => {
        console.error("Error generating subscriptionId", error);
        return response.status(status).send(result);
    });

};

