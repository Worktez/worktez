const {getUserUseEmail, getMyOrgCollectionDoc} = require("../lib");

exports.checkIfUserAlreadyAMember = function(request, response) {
  const organizationDomain = request.body.data.OrganizationDomain;
  // const teamName = request.body.data.TeamName;
  const teamId =request.body.data.TeamId;
  const userEmail = request.body.data.UserEmail;
  let status = 200;
  let resultData = "false";
  getUserUseEmail(userEmail).then((data)=>{
    if(data != undefined){
      getMyOrgCollectionDoc(data.uid, organizationDomain).then((OrgData)=>{
        if(OrgData != undefined){
            if(OrgData.Teams.includes(teamId)){
              resultData =  "true";
            }
        }
        else{
          resultData = "false";
        }
        const result = {data: resultData};
        return response.status(status).send(result);
      })
    }  
  }).catch((err) => {
      status = 500;
      resultData = "false";
      console.error("Error : " + err);
      const result = {data: resultData};
      return response.status(status).send(result);
    });
};
