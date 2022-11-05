/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */

const RazorPay = require("razorpay");
const { standardSubscription } = require("../../application/lib");
const { getSubscriptions } = require("../../subscriptions/lib");
const { setRazorpayOrderDetails, generateBase62Constant, generatePaymentId} = require("../lib");
const { currentTime, currentDate } = require("../../application/lib");
const { keyId, keySecret, orderKey} = require("../../application/paymentKeys");
exports.generateRazorpayOrder = function(request, response) {
  const Uid = request.body.data.Uid;
  const SubscriptionId = request.body.data.SubscriptionId;
  getSubscriptions("", SubscriptionId).then((doc) => {
    if (doc != undefined) {
      const amount = standardSubscription.amount;
      const razorpay = new RazorPay({
        key_id: keyId,
        key_secret: keySecret,
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
        const time = currentTime;
        const date = currentDate;
        setRazorpayOrderDetails(Uid, order, paymentId, SubscriptionId, date, time);
        // Test credentials
        order.key = orderKey;

        order.receipt = generatedReceipt;
        order.paymentId = paymentId;
        const result = { data: order };
        return response.status(200).send(result);
      });
    }
  }).catch((err)=>{
    console.log(err);
  });
};