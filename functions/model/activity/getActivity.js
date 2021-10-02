/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getAction } = require("./lib");

exports.getActivity = function(request, response) {
    var status = 200;
    var actionType = request.body.data.ActionType;
    var taskId = request.body.data.TaskId;
    var orgDomain = request.body.data.OrgDomain;
    var resultData = [];

    if(actionType=="All") {
        actionType = "";
    }

    const promise1 = getAction(orgDomain, taskId, actionType).then((snapshot) => {
        snapshot.forEach(element => {
            resultData.push(element.data());
        });
    });

    return Promise.resolve(promise1).then(() => {
        result={data:{status:"Ok", data: resultData}};
        return response.status(status).send(result);
        })
        .catch((error) => {
            console.error(error);
            result= {data:{status:"Error", data: undefined}};
            return response.status(status).send(result);
        });
};
