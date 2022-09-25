const { getApplicationData, currentDate, standardSubscription, basicSubscription } = require("../../application/lib");
const { getSubscriptions, updateSubscription } = require("../lib");


exports.checkSubscription = function (orgAppKey, subscriptionId) {
  const p = getApplicationData().then((appData) => {
    const TotalNumberOfTeams = appData.TotalNumberOfTeams;
    const TotalNumberOfMembers = appData.TotalNumberOfMembers;
    const CurrentDate = currentDate;

    const promise1 = getSubscriptions(orgAppKey, subscriptionId).then((subData) => {
      const noOfMembers = subData[0].NoOfMembers;
      const noOfTeams = subData[0].NoOfTeams;
      const expiresOn = subData[0].ExpiresOn;
      const graceNotifications = subData[0].GraceNotifications;
      const subscriptionId = subData[0].SubscriptionId;

      if (subData[0].SubscriptionType == "Basic") {
        subData[0] = basicSubscription;
      } else if (subData[0].SubscriptionType == "Standard") {
        subData[0] = standardSubscription;
      } else {
        console.error("Error getting Subscription Plan!");
      }

      const subCheck = [
        TotalNumberOfTeams <= noOfTeams,
        TotalNumberOfMembers <= noOfMembers,
        CurrentDate < expiresOn
      ]

      if (subCheck.includes(false)) {
        const appDetailsUpdateJson = {
          GraceNotifications: graceNotifications - 1,
        };
        updateSubscription(appDetailsUpdateJson, subscriptionId);

      }
      if (graceNotifications <= 0) {
        const appDetailsUpdateJson = {
          SubscriptionStatus: "Inactive",
        }
        updateSubscription(appDetailsUpdateJson, subscriptionId);
      }
    });
    return Promise.resolve(promise1);


  })
  return Promise.resolve(p);
}

