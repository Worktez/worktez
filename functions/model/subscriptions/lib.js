/**
 * Description
 * @param {any} subscriptionId
 * @return {any}
 */
 exports.setSubscription = function(subscriptionId) {
    const setSubscriptionDoc = db.collection("Subscriptions").doc(subscriptionId).set({
      SubscriptionId: subscriptionId,
    });
    return Promise.resolve(setSubscriptionDoc);
  };
  