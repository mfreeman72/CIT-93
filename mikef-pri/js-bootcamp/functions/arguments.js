const showOnPage = function (text) {
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById("output");
  outputDiv.append(newParagraph);
};

//Multiple arguments
let add = function (a, b, c) {
  return a + b + c;
};

let result = add(10, 1, 5);
showOnPage(result);

//Default arguments
let getScoreText = function (name = 'Anonymous', score = 0) {
  return `Name: ${name} - Score: ${score}`;
};

let scoreText = getScoreText(undefined, 99);
showOnPage(scoreText);

// Challenge area
// A 25% tip on $40 would be $10.

let getTip = function (total, tipPercent = 0.2) {
  return `A ${tipPercent * 100}% tip on $${total} would be $${total * tipPercent}.`;
};

let tip = getTip(100, 0.15);
showOnPage(tip);
