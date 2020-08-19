function getTasks() {
    var result = "ok";

    result = getTasksData();

    return result;
}

function getTasksData() {
    var result = "ok";
    document.getElementById("cardsList").innerHTML = "";
    firestore.collection("Bussiness")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log(change.doc.data());
                    createInstance(change.doc.data());
                }
                if (change.type === "modified") {
                    console.log('modified');
                    updateInstance(change.doc.data());
                }
                if (change.type === "removed") {
                    console.log('removed');
                    createInstance(change.doc.data());
                }
            });
            displayCards();
        });

    return result;
}

var dataset;

function createInstance(data) {
    dataset = new StoreData(data);
    setDataIntoCard();

}