/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");

const { getUser } = require("../../users/lib");
const { setRazorDetails, generateBase62Constant } = require("../lib");

exports.razorpayPayment = function(request, response) {
        const uid = request.body.data.Uid;
        const subscriptionId = request.body.data.SubscriptionId;
        const amount = request.body.data.Amount;
        const userName = request.body.data.UserName;
        console.log(amount, userName, uid);
        console.log("UID :::", uid);
        console.log("Amount :::", amount);
        getUser(uid, userName).then((doc) => {
            if (doc != undefined) {
                console.log("check...", doc);
                // Test Credentials
                const razorpay = new RazorPay({
                    key_id: "rzp_test_jWOofTDBbQGPFa",
                    key_secret: "N9fWEfNEVnIrmubuMyDhxP4i",
                });

                // Production Credentials
                // const razorpay = new RazorPay({
                //     key_id: "rzp_live_xoOwFekmzVS4do",
                //     key_secret: "UnY8Vp9ty5c9wL1TWNUlBsci",
                // });

                const generatedReceipt = generateBase62Constant();

                const options = {
                    amount: parseInt(amount * 100), // amount in the smallest currency unit
                    currency: "INR",
                    receipt: generatedReceipt,
                };

                console.log(options);
                razorpay.orders.create(options, function(err, order) {
                    if (err) {
                        const result = { data: err };
                        console.log(err);
                        return response.status(500).send(result);
                    }

                    // db.collection("Registrations").doc(Uid).update({
                    //     RazorPayOrderDetails: order,
                    // });

                    setRazorDetails(uid, order, subscriptionId);
                    // Test credentials
                    order.key = "rzp_test_jWOofTDBbQGPFa";

                    // Production Credentials
                    // order.key = "rzp_live_xoOwFekmzVS4do";
                    order.receipt = generatedReceipt;
                    const result = { data: order };
                    return response.status(200).send(result);
                });
            }
        });
};