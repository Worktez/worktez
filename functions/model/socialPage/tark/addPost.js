/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setPost } = require("../lib");

const { getApplicationData, updateApplication } = require("../../application/lib");

exports.addPost = function(request, response) {
    const uid = request.body.data.Uid;
    const post = request.body.data.Post;

    const lastUpdatedDate = request.body.data.LastUpdatedDate;
    const lastUpdatedTime = request.body.data.LastUpdatedTime;

    let result;
    let status = 200;


    const promise1 = getApplicationData().then((rawData) => {
        if (rawData) {
            let postcounter = rawData.PostCounter;
            postcounter = postcounter + 1;
            let postId = "P" + postcounter;

            setPost(uid, post, postId, lastUpdatedDate, lastUpdatedTime).then((postData) => {
                console.log("Post added Successfully");
            }).catch((error) => {
                result = { data: error };
                status = 500;
                console.error("Error", error);
            });

            const inputJson = {
                PostCounter: postcounter,
            }
            updateApplication(inputJson);
        }

    });

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
        result = { data: "Comment Added successfully" };
        return response.status(status).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error adding Note", error);
        return response.status(status).send(result);
    });
}; 