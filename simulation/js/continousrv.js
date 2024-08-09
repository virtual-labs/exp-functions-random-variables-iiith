document.addEventListener("DOMContentLoaded", function() {
  if (typeof MathJax !== "undefined") {
      reset();
  } else {
      document.getElementById("MathJax-script").onload = function() {
          reset();
      };
  }
});

var yaxis= document.getElementById("inputValue")
var randomize;
function reset() {
    randomize = Math.ceil(parseFloat(Math.random() * 3));
    while(randomize == 0)
      randomize = Math.ceil(parseFloat(Math.random() * 3));
    yaxis.innerHTML = " \\( y_" + randomize +"\\)" ;
    if (typeof MathJax !== "undefined") {
      MathJax.typeset();
   }
    for (var i = 0; i < ids1.length; i++)
      hide(ids2[i], ids1[i]);

    obselement.innerText = "Result: "
}

var obselement = document.getElementById("observationValue");

var ids1 = ["1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h", "1i", "1j", "1k", "1l", "1m", "1n"];
var ids2 = ["2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h", "2i", "2j", "2k", "2l", "2m", "2n"];
var value = [ "\\(F(x_1)\\)", "\\(F(x_2)\\)", "\\(F(x_3)\\)", "\\(F(x_4)\\)", "\\(F(x_5)\\)", "\\(F(x_6)\\)", "\\(F(x_7)\\)", "\\(-F(x_1)\\)", "\\(-F(x_2)\\)", "\\(-F(x_3)\\)", "\\(-F(x_4)\\)", "\\(-F(x_5)\\)", "\\(-F(x_6)\\)", "\\(-F(x_7)\\)",];


function hide(id1, id2) {
  id1 = document.getElementById(id1);
  id2 = document.getElementById(id2);
  id2.style.display = "flex";
  id1.style.display = "none";
}

function check() {
  var ansArray = [];
  for (var i = 0; i < ids1.length / 2; i++) {
      var element = document.getElementById(ids1[i]);
      var displayStyle = window.getComputedStyle(element).display;
      var minuselement = document.getElementById(ids1[i + 7]);
      var minusdisplayStyle = window.getComputedStyle(minuselement).display;
      if (!(displayStyle === "none" && minusdisplayStyle == "none")) {
          if (displayStyle == "none")
              ansArray.push(i);
          else if (minusdisplayStyle == "none")
              ansArray.push(i + 7);
      }
  }
  obselement.innerHTML = "Result: ";
  updateObservation(ansArray);
  checkAnswer(ansArray);
  if (typeof MathJax !== "undefined")
      MathJax.typesetPromise();
}

function updateObservation(ansArray) {
  if (ansArray.length == 0) {
      alert("Either none of the answers were selected or the selected options cancelled out each other. Try again");
      reset();
  } else {
      var tempObs = "";
      for (var i = 0; i < ansArray.length; i++)
          tempObs += value[ansArray[i]].toString() + " + ";
      tempObs = tempObs.slice(0, -3);
      obselement.innerHTML += tempObs;
  }
}

function checkAnswer(ansArray) {
  // Define correct answers for each value of randomize
  const correctAnswers = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // For randomize == 1
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], // For randomize == 2
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]  // For randomize == 3
  ];

  // Select the correct answer array based on the randomize value
  const ans = correctAnswers[randomize - 1];
  let flag = 0;

  // Check if any incorrect elements are chosen
  for (let i = 0; i < ansArray.length; i++) {
    if (ans[ansArray[i]] == 0) {
      flag = 1;
    } else {
      ans[ansArray[i]] = 0;
    }
  }

  // Check if a subset is chosen but not the full answer
  for (let i = 0; i < ans.length; i++) {
    if (ans[i] == 1) {
      flag = 1;
    }
  }

  // Determine the result based on the flag
  if (flag == 1) {
    obselement.innerHTML += " <br> INCORRECT ANS!";
  } else {
    let tempObs = ansArray.map(index => value[index]).join(" + ");
    obselement.innerHTML += `<br> CORRECT ANS! The CDF of g(x) at \\( y_${randomize} \\) is \\(F(y_${randomize}) \\) = ${tempObs}`;
  }
}