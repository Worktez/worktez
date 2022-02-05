/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { getPost, setReactDoc, updatePost } = require("../lib");

exports.addReaction = function(request, response) {
  const postId = request.body.data.PostId;
  const uId = request.body.data.Uid;
  const creationDate = request.body.data.CreationDate;
  const creationTime = request.body.data.CreationTime;
  const type = request.body.data.Type;
  let result;
  let status = 200;
  
  const p1 = getPost(postId).then((postDoc) => {

    if (postDoc == undefined) {
      result = {data: {status: "ERROR", postData: undefined}};
    } else {
            const reactionsCounter = postDoc.Reactions + 1;
            const reactId= "R"+(reactionsCounter);
            setReactDoc(postId, reactId, creationDate, creationTime, type, uId);
            const inputJson = {
                Reactions: reactionsCounter,
            };
            updatePost(inputJson, postId);
      result = {data: {status: "OK", postData: postDoc}};
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });


  
  return Promise.resolve(p1).then(() => {
    console.log("Fetched Post Successfully");
    return response.status(status).send(result);
  }).catch((error) => {
    console.error("Error Fetching Post", error);
    return response.status(status).send(result);
  });
};
