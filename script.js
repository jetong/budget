var canvas;
var context;
var colors = [];
var expenses = [];


// Execute on page load/refresh
function init() {
  // Get canvas graphics context
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // Clear cache on page refresh
  startOver()

  // Initialize rgb values for categories
  randomizeColors();

  // Register canvas dimensions onload
  resizeCanvas();

  // Add listener to adjust canvas to match window resize, and redraw the pie chart
  window.addEventListener('resize', refreshCanvas, false);
}


// Execute on 'submit expenses' button click
function main() {
  // Process form and store values in cache
  processForm();
  // Render visual data
  draw();
  // Display balance
  displayBalance();
}


// Execute on 'start over' button click
function startOver() {
  // Clear session stored values 
  sessionStorage.clear();
  expenses = [];

  // Clear input fields 
  var fields = document.getElementsByTagName("input");
  for(var i = 0; i < fields.length; i++) {
    fields[i].value = "";
  }
  document.getElementById("balance").style.background = "";

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Clear key
  keyDiv = document.getElementById("key");
  while (keyDiv.firstChild) {
    keyDiv.removeChild(keyDiv.firstChild);
  }

  randomizeColors();
}


function processForm() {
  // Initialize map for expense categories
  var prevExpenses = {};
  var inputElements = document.getElementsByClassName("expenses");
  var keys = [];
  for(var i = 0; i < inputElements.length; i++) {
    keys[i] = inputElements[i].id;
    // If current key is undefined, define it with value 0
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
      expenses[i] = prevExpenses[inputElements[i].id];
    } else { // In case field input is empty/undefined
      prevExpenses[inputElements[i].id] += 0;
    }
  }

  // Set storage to the latest cumulative total
  for(var key in prevExpenses) {
    sessionStorage.setItem(key, parseInt(prevExpenses[key]));
  }
}


function draw() {
  drawPieChart(canvas.width/2, canvas.height/2, canvas.width*.4);
  drawKey();
}


// Draw pie chart one section (category) at a time
function drawPieChart(x, y, radius) {
  // Current pie section's ratio to the entire pie
  var ratio;

  // Sum up expenses to calculate individual ratios
  var totalExpenses = 0;
  for(var i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i];
  }

  // Starting and ending angles of each pie section
  var startingAngle = 0;
  var endingAngle = 0;

  for(var i = 0; i < expenses.length; i++) {
    context.beginPath();

    context.fillStyle = colors[i];

    ratio = expenses[i]/totalExpenses;
    endingAngle = startingAngle + Math.PI*2*ratio;

    context.arc(x, y, radius, startingAngle, endingAngle);
    context.lineTo(x, y);
    context.fill();
    context.stroke();
    context.closePath();
    startingAngle = endingAngle;
  }
}


// Dynamically create key for pie chart
function drawKey() {
  keyDiv = document.getElementById("key");

  // Remove previous key items
  while (keyDiv.firstChild) {
    keyDiv.removeChild(keyDiv.firstChild);
  }

  // Append new key items
  var inputElements = document.getElementsByClassName("expenses");
  for(var i = 0; i < inputElements.length; i++) {
    var item = document.createElement("div");
    var label = document.createElement("label");
    var colorBox = document.createElement("div");

    // style colorBox
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.background = colors[i];
    colorBox.style.border = "solid thin #000000";
    colorBox.style.display = "inline-block";
    colorBox.style.margin = "5px";
    colorBox.style.float = "left";

    // Style label next to colorBox
    label.innerHTML = inputElements[i].id;
    label.style.textAlign = "left";
    label.style.width = "auto";
    label.style.margin = "7px";

    // Style item container for colorBox and label
    item.style.width = "auto";
    item.style.textAlign = "left";

    // Attach items to DOM
    item.appendChild(colorBox);
    item.appendChild(label);
    keyDiv.appendChild(item);
  }
}


// Display balance for current session
function displayBalance() {
  var income = document.getElementById("income").value || 0;

  var totalExpenses = 0;
  for(var i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i];
  }

  var balance = income - totalExpenses;
  document.getElementById("balance").value = balance; 
  if(balance < 0) {
    document.getElementById("balance").style.background = "#ffdddd";
  } else {
    document.getElementById("balance").style.background = "#ddffdd";
  }
}


// Helper functions

// Fill colors[] with random colors for each expense category
function randomizeColors() {
  var categories = document.getElementsByClassName("expenses");
  for(var i = 0; i < categories.length; i++) {
    var red = Math.trunc(Math.random()*255);
    var green = Math.trunc(Math.random()*255);
    var blue = Math.trunc(Math.random()*255);
    colors[i] = "rgb(" + red + "," + green + "," + blue + ")";
  }
}


// Update canvas dimensions and redraw pie chart
function refreshCanvas() {
  resizeCanvas();
  drawPieChart(canvas.width/2, canvas.height/2, canvas.width*.4);
}


// Match canvas dimensions to the resizing parent wrapper-div
function resizeCanvas() {
  canvas.width = document.getElementById("canvas-wrapper").clientWidth;
  canvas.height = document.getElementById("canvas-wrapper").clientHeight;
}
