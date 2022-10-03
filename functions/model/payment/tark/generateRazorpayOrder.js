/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");
const { standardSubscription } = require("../../application/lib");
const { getSubscriptions } = require("../../subscriptions/lib");
const { setRazorpayOrderDetails, generateBase62Constant, generatePaymentId} = require("../lib");
const { currentTime, currentDate } = require("../../application/lib");

exports.generateRazorpayOrder = function(request, response) {
        const Uid = request.body.data.Uid;
        const SubscriptionId = request.body.data.SubscriptionId;
        console.log("Uid", Uid);
        console.log("SubscriptionId", SubscriptionId);
        // const OrgDomain = request.body.data.OrgDomain;
        getSubscriptions("", SubscriptionId).then((doc) => {
            console.log(doc);
            if (doc != undefined) {
                // Test Credentials
                console.log(doc);
                const amount = standardSubscription.amount;
                const razorpay = new RazorPay({
                    key_id: "rzp_test_nfhDfN6X5cgp42",
                    key_secret: "EjWL1pPedHeT4Z1C4laM3u1b",
                });


                const generatedReceipt = generateBase62Constant();

                const options = {
                    amount: parseInt(amount * 100), // amount in the smallest currency unit
                    currency: "USD",
                    receipt: generatedReceipt,
                };

                razorpay.orders.create(options, function(err, order) {
                    if (err) {
                        const result = { data: err };
                        console.log(err);
                        return response.status(500).send(result);
                    }

                    // db.collection("Registrations").doc(Uid).update({
                    //     RazorPayOrderDetails: order,
                    // });
                    const paymentId = generatePaymentId();
                    console.log(paymentId);
                    const time = currentTime;
                    const date = currentDate;
                    setRazorpayOrderDetails(Uid, order, paymentId, SubscriptionId, date, time);
                    // Test credentials
                    order.key = "rzp_test_nfhDfN6X5cgp42";

                    order.receipt = generatedReceipt;
                    order.paymentId = paymentId;
                    const result = { data: order };
                    console.log(result);
                    return response.status(200).send(result);
                });
            }
        }).catch((err)=>{
            console.log(err);
        });
};