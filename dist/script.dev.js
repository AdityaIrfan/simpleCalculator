"use strict";

// History
function getHistory() {
  return document.getElementById("history-value").innerText;
}

function printHistoryValue(data) {
  document.getElementById("history-value").innerText = data;
} // Output


function getOutput() {
  return document.getElementById("output-value").innerText;
}

function printOutputValue(data) {
  if (data == "") {
    document.getElementById("output-value").innerText = data;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(data);
  }
}

function getFormattedNumber(data) {
  if (data == "-") {
    return "";
  }

  var n = Number(data);
  var value = n.toLocaleString("en"); // toLocaleString is function to convert array to String and "en" for add comma(,) each 3 number

  return value;
}

function reverseNumberFormat(data) {
  return Number(data.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function () {
    if (this.id == "clear") {
      printHistoryValue("");
      printOutputValue("");
    }

    if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();

      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1); // it will take string from indeks 0 to latest indeks-1. So latest indeks will disappear

        printOutputValue(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();

      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          // iw will return true if the latest character is not number
          history = history.substr(0, history.length - 1);
        }
      }

      if (output != "" || history != "") {
        output = reverseNumberFormat(output);
        history = history + output;

        if (this.id == "=") {
          var result = eval(history); // eval function who return result from parameter. eval(string)

          printOutputValue(result);
          printHistoryValue("");
        } else {
          history = history + this.id;
          printHistoryValue(history);
          printOutputValue("");
        }
      }
    }
  });
}

var number = document.getElementsByClassName("number");

for (var i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function () {
    var output = reverseNumberFormat(getOutput());

    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutputValue(output);
    }
  });
}