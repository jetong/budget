var income = sessionStorage.getItem("income") || 0;
var housing = sessionStorage.getItem("housing") || 0;
var transportation = sessionStorage.getItem("transportation") || 0;
var education = sessionStorage.getItem("education") || 0;
var personal = sessionStorage.getItem("personal") || 0;
var savings = sessionStorage.getItem("savings") || 0;

function update() {
  sessionStorage.setItem("income", 
    parseInt(income) + parseInt(document.getElementById("income").value));
  sessionStorage.setItem("housing", 
    parseInt(income) + parseInt(document.getElementById("housing").value));
  sessionStorage.setItem("transportation", 
    parseInt(income) + parseInt(document.getElementById("transportation").value));
  sessionStorage.setItem("education", 
    parseInt(income) + parseInt(document.getElementById("education").value));
  sessionStorage.setItem("personal", 
    parseInt(income) + parseInt(document.getElementById("personal").value));
  sessionStorage.setItem("savings", 
    parseInt(income) + parseInt(document.getElementById("savings").value));
}
