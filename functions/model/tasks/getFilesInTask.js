/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getFileInTask } = require("./lib");

exports.getFilesInTask = function(request, response) {
    const orgDomain = request.body.data.OrgDomain;
    const taskId = request.body.data.Id;
    let resultData = [];
    let status = 200;

    const promise1 = getFileInTask(orgDomain, taskId).then((snapshot) => {
        snapshot.forEach((element) => {
            resultData.push(element.data());
        });
    });

    return Promise.resolve(promise1).then(() => {
        result={data: {status: "Ok", data: resultData}};
        return response.status(status).send(result);
    })
    .catch((error) => {
        console.error(error);
        result= {data: {status: "Error", data: undefined}};
        return response.status(status).send(result);
    });
};
