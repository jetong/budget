var canvas;
var context;
var totalExpense = 0;
var colors = [];
var expenses = [];


function update() {
  // Initialize map for expense categories
  var prevExpenses = {};
  var inputElements = document.getElementsByClassName("expenses");
  var keys = [];
  for(var i = 0; i < inputElements.length; i++) {
    keys[i] = inputElements[i].id;
    // If the current key/value is undefined, define the key with value 0
    if(!prevExpenses[keys[i]]) {
      prevExpenses[keys[i]] = 0;
    }
  }

  // Get previous key/values from sessionStorage and store into map
  // Note: Doesn't execute on first run as there are no stored key/values initially and the length is 0.
  for(var i = 0; i < Object.keys(sessionStorage).length; i++) {
    var key = Object.keys(sessionStorage)[i];
    var value = sessionStorage.getItem(key);
    prevExpenses[key] = parseInt(value);
  }

  // Get current values submitted by user and accumulate into prevExpenses map
  for(var i = 0; i < inputElements.length; i++) {
    if(inputElements[i].value) {
      prevExpenses[inputElements[i].id] += parseInt(inputElements[i].value);
    } else { // In case field input is empty/undefined
      prevExpenses[inputElements[i].id] += 0;
    }
  }

  // Set storage to the latest cumulative total
  for(var key in prevExpenses) {
    sessionStorage.setItem(key, parseInt(prevExpenses[key]));
  }
}

function clearForm() {
  sessionStorage.clear();
  var exp = document.getElementsByClassName("expenses");
  for(var i = 0; i < exp.length; i++) {
console.log(exp[i].value);
    exp[i].value = "";
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
  // Get canvas graphics context
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // Initialize rgb values
  var categories = document.getElementsByTagName("input").length - 1;
  for(var i = 0; i < categories; i++) {
    var red = Math.trunc(Math.random()*255);
    var green = Math.trunc(Math.random()*255);
    var blue = Math.trunc(Math.random()*255);
    colors[i] = "rgb(" + red + "," + green + "," + blue + ")";
  }

  // Set listener to resize canvas to match window resize, and redraw the pieChart
  window.addEventListener('resize', resizeCanvas, false);
  // Register canvas dimensions onload
  canvas.width = document.getElementById("canvas-wrapper").clientWidth;
  canvas.height = document.getElementById("canvas-wrapper").clientHeight;
}

function resizeCanvas() {
  canvas.width = document.getElementById("canvas-wrapper").clientWidth;
  canvas.height = document.getElementById("canvas-wrapper").clientHeight;
  PieChart();
}

function PieChart() {
  drawPieChart(canvas.width/2, canvas.height/2, canvas.width/3);
  createKey();
}

function drawPieChart(x, y, radius) {
  // Reset totalExpense after each button click
  totalExpense = 0;
 
  // Place cached values into array and calculate sum
  var values = [];
  for(var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    var value = sessionStorage[key];
    // Push value into array
    values.push(value);
    // Compute total_expense
    totalExpense += parseInt(value);
  }

  // Starting and ending angles of each pie section
  var startingAngle = 0;
  var endingAngle = 0;

  // Current pie section's ratio of the whole pie
  var ratio;
  for(var i = 0; i < values.length; i++) {
    context.beginPath();

    context.fillStyle = colors[i];

    ratio = values[i]/totalExpense;
    endingAngle = startingAngle + Math.PI*2*ratio;

    context.arc(x, y, radius, startingAngle, endingAngle);
    context.lineTo(x, y);
    draw();
    startingAngle = endingAngle;

  }
}

function draw() {
    context.fill();
    context.stroke();
    context.closePath();
}

function createKey() {
  keyDiv = document.getElementById("key");

  // Remove previous key items
  while (keyDiv.firstChild) {
    keyDiv.removeChild(keyDiv.firstChild);
  }

  // Append new key items
  for(var i = 0; i < 6; i++) {
    var item = document.createElement("p");
    var label = document.createElement("label");
    var colorBox = document.createElement("div");

    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.background = colors[i];
    colorBox.style.display = "inline-block";
    colorBox.style.border = "red";
    label.innerHTML = "housing";
    label.style.border = "green";
    item.style.border = "black";

    item.appendChild(colorBox);
    item.appendChild(label);
    keyDiv.appendChild(item);
  }
}

