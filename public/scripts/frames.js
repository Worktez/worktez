var frames = [];

function setDataIntoCard() {

    var title = dataset.title;
    var priority = dataset.priority;
    var assignee = dataset.assignee;
    var creator = dataset.creator;


    var frame = "<div class=\"card text-white bg-dark\">";

    // frame += "<div class=\"card-header\">" + cardDate + "</div>";
    frame += "<div class=\"card-body py-3\">";
    // frame += "<div class=\"row pb-2\">";
    // frame += "<div class=\"col-md-4 col-4\">";
    // frame += "<h6 class=\"card-title text-center py-1\"></h6>";
    // frame += "</div>";
    // frame += "<div class=\"col-md-8 col-8 px-2\">" + id + "</div>";
    // frame += "</div>";

    frame += "<div class=\"row pb-2\">";
    frame += "<div class=\"col-md-4 col-4\">";
    frame += "<h6 class=\"card-title text-center py-1\"></h6>";
    frame += "</div>";
    frame += "<div class=\"col-md-8 col-8 px-2\">" + title + "</div>";
    frame += "</div>";

    frame += "<div class=\"row pb-2\">";
    frame += "<div class=\"col-md-4 col-4\">";
    frame += "<h6 class=\"card-title text-center py-1\"></h6>";
    frame += "</div>";
    frame += "<div class=\"col-md-8 col-8 px-2\">" + priority + "</div>";
    frame += "</div>";

    frame += "<div class=\"row pb-2\">";
    frame += "<div class=\"col-md-4 col-4\">";
    frame += "<h6 class=\"card-title text-center py-1\"></h6>";
    frame += "</div>";
    frame += "<div class=\"col-md-8 col-8 px-2\">" + assignee + "</div>";
    frame += "</div>";

    frame += "<div class=\"row pb-2\">";
    frame += "<div class=\"col-md-4 col-4\">";
    frame += "<h6 class=\"card-title text-center py-1\"></h6>";
    frame += "</div>";
    frame += "<div class=\"col-md-8 col-8 px-2\">" + creator + "</div>";
    frame += "</div>";

    frame += "</div>";
    frame += "</div>";

    frames[title] = frame;

    return "ok";

}

function displayCards() {

    var tickets = '';
    console.log('hiii');
    frames.forEach(element => {
        tickets = tickets + element;
        console.log("element");
    });


    document.getElementById("cardsList").innerHTML = tickets;
}