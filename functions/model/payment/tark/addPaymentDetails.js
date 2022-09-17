const {getApplicationData, updateApplication} = require("../../application/lib");
const {setPayment} = require("../lib");

exports.addPaymentDetails = function(request, response) {
//   const paymentId = request.body.data.PaymentId;
  const amount = request.body.data.Amount;
  const userUid = request.body.data.Uid;
  const subscriptionId = request.body.data.SubscriptionId;
  const paymentTime = request.body.data.PaymentTime;
  const userEmailAddress = request.body.data.EmailAddress;
  const paymentDate = request.body.data.PaymentDate;

  let result;
  const status = 200;

  const promise1 = getApplicationData().then((rawData) => {
    if (rawData) {
      let paymentCounter = rawData.PaymentCounter;
      paymentCounter = paymentCounter + 1;
      const paymentId = "Pay" + paymentCounter;

      setPayment(amount, userUid, subscriptionId, paymentId, userEmailAddress, paymentTime, paymentDate).then(() => {
        console.log("payment added successfully");
      }).catch((error) => {
        result = {data: error};
        console.error("Error", error);
      });
      const inputJson = {
        PaymentCounter: paymentCounter,
      };
      updateApplication(inputJson);
    }
  });

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    result = {data: "User Payment Addd"};
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error adding Payment", error);
    return response.status(status).send(result);
  });
};