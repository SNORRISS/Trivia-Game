var questions = [];
var queryURL =
  "https://opentdb.com/api.php?amount=50&category=15&type=multiple";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  questions = response.results;
  console.log(questions);

  divCreate();
  divCreate();
  divCreate();
});

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

function divCreate() {
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

    ansArray.splice(rand, 1);
    newAnswers.append(newRadio);
    newAnswers.append(newLabel);
  }

  newDiv.append(newH2);
  newDiv.append(newAnswers);
  $("#card").append(newDiv);
}
