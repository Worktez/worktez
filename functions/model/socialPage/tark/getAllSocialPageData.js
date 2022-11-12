/* eslint-disable no-const-assign */
const {getAllPosts, getCommentsContent} = require("../lib");
const {getReactionsContent} = require("../lib");

exports.getAllSocialPageData = function(request, response) {
  const currentEpochTime = request.body.data.CurrentEpochTime;
  const status =200;
  let result;
  const socialPageData={};
  const promise = getAllPosts(currentEpochTime).then((postDoc) => {
    let promise1;
    const promises=[];
    postDoc.forEach((element) => {
      const comments=[];
      const reactions=[];
      const postData = element.data();
      const postId = postData.PostId;
      socialPageData[postId] = postData;
      promise1 = getReactionsContent(postId).then((data) => {
        data.forEach((reactionData) => {
          const reactionsData = reactionData.data();
          reactions.push(reactionsData);
          socialPageData[postId]["Reactionss"] = reactions;
        });
      });
      promises.push(promise1);
      promise1 = getCommentsContent(postId).then((data) => {
        data.forEach((commentData) => {
          const commentsData = commentData.data();
          comments.push(commentsData);
          socialPageData[postId]["Comments"] = comments;
        }
        );
      });
      promises.push(promise1);
    });
    return Promise.all(promises);
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });
  return Promise.resolve(promise).then(() => {
    result = {data: socialPageData};
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Getting Posts", error);
    return response.status(status).send(result);
  });
};
