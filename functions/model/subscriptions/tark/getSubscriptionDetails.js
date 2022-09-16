const {getSubscriptionDetails} = require("../lib");

exports.getSubscriptionDetails = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const orgAppKey = request.body.data.OrgAppKey;
    console.log(orgDomain);
    let status = 200;
    let result;

    getSubscriptionDetails(orgAppKey).then((sData) => {
        if(sData){
            console.log(sData);
            result = {data: {status: "OK", resultData: sData}};
            return response.status(status).send(result);
        }
    }).catch((error) => {
        status = 500;
        result = {data: error};
        console.error("Error getting subscription data", error);
        return response.status(status).send(result);
    });
};