/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");
const { currentTime, currentDate } = require("../../application/lib");

const { getUser } = require("../../users/lib");

const { setRazorpayOrderDetails, generateBase62Constant} = require("../lib");

exports.generateRazorpayOrder = function(uid, paymentId, subscriptionId, amount) {
        
        // const subscriptionId = request.body.data.SubscriptionId;

        getUser(uid, "").then((doc) => {
            if (doc != undefined) {
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

                razorpay.orders.create(options, function(err, order) {
                    console.log(order);
                    if (err) {
                        const result = { data: err };
                        console.log(result);
                        return err;
                    }
                    // db.collection("Registrations").doc(Uid).update({
                    //     RazorPayOrderDetails: order,
                    // });
                    const time = currentTime;
                    const date = currentDate;

                    setRazorpayOrderDetails(uid, order, paymentId, subscriptionId, date, time);
                    // Test credentials
                    // order.key = "rzp_test_jWOofTDBbQGPFa";

                    // Production Credentials
                    // order.key = "rzp_live_xoOwFekmzVS4do";
                    // order.receipt = generatedReceipt;
                    
                });
            }
        });
};