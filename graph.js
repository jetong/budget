var canvas;
var context;

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
}

function resizeCanvas() {
  canvas.width = document.getElementById("canvas-wrapper").clientWidth;
  canvas.height = document.getElementById("canvas-wrapper").clientHeight;
  PieChart();
}

function PieChart() {
  drawPieChart(canvas.width/2, canvas.height/2, canvas.height/3);
}

function drawPieChart(x, y, radius) {
  context.save();

  var values = [];
  var sum = 0;

  for(var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    if(key != "income") {
      var value = sessionStorage[key];
      values.push(value);
      // Compute sum of all values
      sum += parseInt(value);
    }
  }


  // Initialize rgb values
  var red = 0;
  var green = 0;
  var blue = 0;

  // Starting and ending angles of each pie section
  var startingAngle = 0;
  var endingAngle = 0;

  // Current pie section's ratio of the whole pie
  var ratio;

  for(var i = 0; i < values.length; i++) {
    context.beginPath();

    switch(i%3) {
      case 0:
        red += 80;
        break;
      case 1:
        green += 80;
        break;
      case 2:
        blue += 80;
        break;
      default:
        console.log("Error with switch statement in drawPieChart()");
        return;
    }
    context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";

    ratio = values[i]/sum;
    endingAngle = startingAngle + Math.PI*2*ratio;

    context.arc(x, y, radius, startingAngle, endingAngle);

    context.lineTo(x, y);

    startingAngle = endingAngle;

    context.fill();
    context.stroke();
    context.closePath();

    context.restore();
  }
}

