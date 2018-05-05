var url ="https://my-train-schedule.firebaseio.com/";
var dataRef = new Firebase(url);
var config = {
    apiKey: "AIzaSyBQPqt20ilRvirmQ_HNNLkITZz8MAkw8iE",
    authDomain: "train-schedule-ef05c.firebaseapp.com",
    databaseURL: "https://train-schedule-ef05c.firebaseio.com",
    storageBucket: "train-schedule-ef05c.appspot.com",
  };
  
  firebase.initializeApp(config);
  
var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();

var name = $("#name-input").val().trim();
var destination = $("#destination-input").val().trim();
var firstTrainTime = moment($("#first-train-time-input").val().trim(), "DD/MM/YY").format("X");
var frequency = $("#frequency-input").val().trim();

var newTrain = {
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };

database.ref().push(newTrain);

alert("Train successfully added");

$("#name-input").val("");
$("#destination-input").val("");
$("#first-train-time-input").val("");
$("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var firstTrainTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

    $("#train-schedule > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    firstTimeConverted + "</td><td>" + diffTime + "</td><td>" + frequency + "</td><td>" + empBilled + "</td></tr>");
  });
  
 
