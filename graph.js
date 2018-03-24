var canvas;
var context;
var sum = 0;
var colors = [];

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

  // Resize canvas to match window resize, and redraw the pieChart
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
}

function resizeCanvas() {
  canvas.width = document.getElementById("canvas-wrapper").clientWidth;
  canvas.height = document.getElementById("canvas-wrapper").clientHeight;
  PieChart();
}

function PieChart() {
  drawPieChart(canvas.width/2, canvas.height/2, canvas.width/3);
//  createKey();
}

function drawPieChart(x, y, radius) {
  // Reset sum for each button click
  sum = 0;
 
  // Place cached values into array and calculate sum
  var values = [];
  for(var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    if(key != "income") {
      var value = sessionStorage[key];
      // Push value into array
      values.push(value);
      // Compute sum of all values
      sum += parseInt(value);
    }
  }

  // Starting and ending angles of each pie section
  var startingAngle = 0;
  var endingAngle = 0;

  // Current pie section's ratio of the whole pie
  var ratio;
  for(var i = 0; i < values.length; i++) {
    context.beginPath();

    context.fillStyle = colors[i];

    ratio = values[i]/sum;
    endingAngle = startingAngle + Math.PI*2*ratio;

    context.arc(x, y, radius, startingAngle, endingAngle);

    context.lineTo(x, y);

    startingAngle = endingAngle;

    context.fill();
    context.stroke();
    context.closePath();
  }
}
/*
function createKey() {
  keyDiv = document.getElementById("key");


  for(var i = 0; i < values.length; i++) {
    var item = document.createElement("p");
    var label = document.createElement("label");
    var colorBox = document.createElement("div");

    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.background = "blue";
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
*/
