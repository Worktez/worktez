/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line linebreak-style
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { setPaymentStatus } = require("../lib");
const crypto = require("crypto");
exports.paymentVerification = function(request, response) {
        const orderId = request.body.data.OrderId;
        const paymentId = request.body.data.PaymentId;
        const signature = request.body.data.Signature;
        const id = request.body.data.Id;
        const type = request.body.data.PaymentType;
    console.log("checking");
        console.log("orderId: " + orderId);
        console.log("paymentId: " + paymentId);
        console.log("signature: " + signature);
        console.log("Id: " + id);
        console.log("type", type);

        // Test Credentials
        const keySecret = "";

        // Production Credentials
        let generatedSignature = "";

        generatedSignature = crypto.createHmac("", keySecret).update((orderId + "|" + paymentId).toString()).digest("hex");
        console.log(generatedSignature);

        if (generatedSignature === signature) {
            const result = { data: "Payment verified successfully", status: 200 };
            console.log("Payment successful");
  
                setPaymentStatus(orderId, id);
            
            return response.status(200).send(result);
        } else {
            const result = { data: "Payment Incomplete" };
            return response.status(500).send(result);
        }
};