const {generateBase64String, milliSeconds} = require("../../application/lib");
const { setSubscription } = require("../lib");

exports.addSubscription = function(orgAppKey, uid, subscriptionData, orgDomain) {
    const subscriptionId = generateBase64String( milliSeconds+orgAppKey);
    const graceNotifications = 5;
    const expiresOn="No limit";
    const promise = setSubscription(subscriptionData, orgDomain, uid, orgAppKey, subscriptionId, graceNotifications, expiresOn);
    return Promise.resolve(promise);
};

