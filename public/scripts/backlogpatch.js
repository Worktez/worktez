function setDataIntoBacklog() {
    db.collection("S-1").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            db.collection("Backlog").doc(doc.id).set({
                Id: doc.id,
                Title: doc.data().Title,
                Description: doc.data().Description,
                Priority: doc.data().Priority,
                Difficulty: doc.data().Difficulty,
                Creator: doc.data().Creator,
                Assignee: doc.data().Assignee,
                ET: doc.data().ET,
                Status: doc.data().Status,
                Category: doc.data().Category,
                LogWorkTotalTime: doc.data().LogWorkTotalTime,
                WorkDone: doc.data().WorkDone,
                SprintNumber: doc.data().SprintNumber,
                StoryPointNumber: doc.data().StoryPointNumber

            });

            db.collection("S-1").doc(doc.id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        });
    });

}

$("#Backlog").click(function() {
    console.log("working");
    setDataIntoBacklog();

});