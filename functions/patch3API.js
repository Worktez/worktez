const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");

const db = admin.firestore();

exports.patch3 = functions.https.onRequest((request, response) =>{
    cors(request, response, () =>
    {
        const OrgDomain = request.body.data.OrgDomain;
        const oldField = request.body.data.FieldName;
        const oldFieldValue = request.body.data.FieldValue;
        const newField = request.body.data.NewField;
        const newFieldValue = request.body.data.NewFieldValue;
        let taskId;
        
        const promise1 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").where(oldField, "==", oldFieldValue).get().then((task) => {
            task.forEach((doc) => {
                taskId = doc.data().Id;
                console.log("Executing Promise2 of Patch3");
            if(newField=="Assignee"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Assignee: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="CompletionDate"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                CompletionDate: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="CreationDate"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                CreationDate: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Creator"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Creator: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Description"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Description: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Difficulty"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Difficulty: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="EstimatedTime"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                EstimatedTime: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="LogWorkTotalTime"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                LogWorkTotalTime: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Priority"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Priority: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Project"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Project: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="SprintNumber"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                SprintNumber: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Status"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Status: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="StoryPointNumber"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                StoryPointNumber: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="TeamId"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                TeamId: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="Title"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                Title: newFieldValue,
            });
            return Promise.resolve(p2);
        }else if(newField=="WorkDone"){
            const p2 = db.collection("Organizations").doc(OrgDomain).collection("Tasks").doc(taskId).update({
                WorkDone: newFieldValue,
            });
            return Promise.resolve(p2);
        }
        }); 
        const Promises=[promise1]  ;
        Promise.all(Promises).then(() => {
            result = { data: "OK! Patch3 executed" };
            console.log("updated");
            return response.status(200).send(result);
        }).catch(function(error) {
            result = { data: error };
            console.error("Patch error in updating value", error);
            return response.status(500).send(result);
        });
        });
    });
})