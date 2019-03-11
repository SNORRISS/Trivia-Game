var questions = [];
var queryURL =
  "https://opentdb.com/api.php?amount=50&category=15&type=multiple";

var time = 10;
var timeEnd = false;
var answers = [];

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  questions = response.results;
  console.log(questions);

  divCreate(1);
  divCreate(2);
  divCreate(3);
  start();
});

$(document).on("click", "input", function(){


console.log("test");
var group = $(this).attr("class");
console.log(group);

 $("." + group).prop("checked", false);
 $(this).prop("checked", true);

if($(this).attr("correct") == "true"){
answers[group] = true;
console.log(answers[group]);
}else{
  answers[group] = false;
  console.log(answers[group]);

}
})

function start(){
intervalid = setInterval(count, 1000);

}

function stop(){
clearInterval(intervalid);
}

function count(){

time--;
$("#timer").text("Time Remaining: " + time + " seconds");
if(time < 0){
  timeEnd = true;
  stop();
  endScreen();
}

}

function endScreen(){
$("#card").html("");

for(var i = 1; i < 4; i++){
  var newDiv = $("<div>");
  if(answers[i] == true){
  newDiv.html("Question "+ i + ": Correct");
  }else{
    newDiv.html("Question "+ i + ": Incorrect");

  }
  $("#card").append(newDiv);
}

}

function getRandomInt() {
  var max = Math.floor(questions.length);
  var min = Math.ceil(0);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(max, min) {
  max = Math.floor(max);
  min = Math.ceil(min);
  return Math.floor(Math.random() * (max - min)) + min;
}

function divCreate(group) {
  var newDiv = $("<div>");
  var newH2 = $("<h2>");
  var num = getRandomInt();
  var ansArray = [];
  var newAnswers = $("<div id = 'answers'>");
  console.log(questions[num]);
  ansArray.push(questions[num].correct_answer);
  ansArray.push(questions[num].incorrect_answers[0]);
  ansArray.push(questions[num].incorrect_answers[1]);
  ansArray.push(questions[num].incorrect_answers[2]);

  console.log(questions[num].question);
  newH2.text(
    questions[num].question
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&eacute;/g, "é")
  );

  for (i = 0; i < 4; i++) {
    var newRadio = $("<input type = 'radio' >");
    var rand = getRandom(ansArray.length, 0);
    var newLabel = $(
      "<label for = '" +
        ansArray[rand]
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "é") +
        "'>"
    );

    newRadio.attr(
      "id",
      ansArray[rand]
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é")
    );
    newLabel.text(
      ansArray[rand]
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é")
    );

    if(ansArray[rand] == questions[num].correct_answer){
      newRadio.attr("correct", "true");
    }else{
      newRadio.attr("correct", "false");
    }

    newRadio.attr("class", group);
    ansArray.splice(rand, 1);
    newAnswers.append(newRadio);
    newAnswers.append(newLabel);
  }

  newDiv.append(newH2);
  newDiv.append(newAnswers);
  $("#card").append(newDiv);
}
