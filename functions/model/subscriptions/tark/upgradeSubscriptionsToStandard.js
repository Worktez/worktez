const { standardSubscription } = require("../../application/lib");
const { generateRazorpayOrder } = require("../../payment/tark/generateRazorpayOrder");
const { getSubscriptions, updateSubscription } = require("../lib");

exports.upgradeSubscriptionsToStandard = function(request, response) {
    const uid = request.body.data.Uid;
    const subscriptionId = request.body.data.SubscriptionId;  
    let status = 200;
    let result;

    getSubscriptions("",subscriptionId).then((subData) => {
        if(subData.SubscriptionType != "Standard"){
            const subscriptionData = standardSubscription;
            let  paymentId= subData.PaymentId;
            paymentId++;
            const inputJson = {
                PaymentId: paymentId,
                SubscriptionType: subscriptionData.subscriptionType,
                GraceNotifications: 5,
                NoOfTeams: subscriptionData.noOfTeams,
                NoOfMembers: subscriptionData.noOfMembers,
                EmailsAndNotifications: subscriptionData.emailsAndNotifications,
                QuickNotes: subscriptionData.quickNotes,
                TechTag: subscriptionData.techTag,
                Meetings: subscriptionData.meetings,
                PDashboard: subscriptionData.pDashboard,
                PReport: subscriptionData.pReport,
                DocPerTask: subscriptionData.docPerTask,
                Amount: subscriptionData.amount,
                CurrencyType: subscriptionData.currencyType,
                SubscritionStatus: "Active"
            }
           const p1 = updateSubscription(inputJson, subscriptionId);
            result = {data: "Subscription updated succesfully"};
           const p2 = generateRazorpayOrder(uid, paymentId, subscriptionId);
           const promises = [p1, p2];
           Promise.all(promises).then(() => {
               return response.status(status).send(result);
           }).catch((error) => {
            status = 500;
            result = { data: error };
            return response.status(status).send(result);
           })
            return response.status(200);
    }

    }).catch((error) => {
        status = 500;
        result = {data: "Subscription not updated ", error: error};
    });

}