const {getTeam, setLabelProperties, updateTeamDetails} =require("../lib");

exports.addLabel = function(request, response) {
  const displayName = request.body.data.DisplayName;
  const iconName = request.body.data.IconName;
  const colorCode = request.body.data.ColorCode;
  const scope = request.body.data.Scope;
  const orgDomain = request.body.data.OrgDomain;
  const teamName = request.body.data.TeamName;

  let result;
  let status = 200;

  const promise = getTeam(orgDomain, teamName).then((team)=>{
    if (team) {
      let labelCounter=team.LabelCounters;
      labelCounter++;
      const id = "L"+ labelCounter;
      const inputJson={
        LabelCounters: labelCounter,
      };
      updateTeamDetails(inputJson, orgDomain, teamName);


      setLabelProperties(orgDomain, teamName, id, displayName, scope, iconName,
          colorCode);
    } else {
      console.log("Team does not exist");
      status=500;
    }
  });


  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Label edited Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    status=500;
    console.error("Error editing Label", error);
    return response.status(status).send(result);
  });
};
