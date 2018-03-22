var income, 
    housing, 
    transportation, 
    education, 
    personal, 
    savings;

function update() {
  income = sessionStorage.getItem("income") || 0;
  housing = sessionStorage.getItem("housing") || 0;
  transportation = sessionStorage.getItem("transportation") || 0;
  education = sessionStorage.getItem("education") || 0;
  personal = sessionStorage.getItem("personal") || 0;
  savings = sessionStorage.getItem("savings") || 0;

  sessionStorage.setItem("income", 
    parseInt(income) + parseInt(document.getElementById("income").value));
  sessionStorage.setItem("housing", 
    parseInt(housing) + parseInt(document.getElementById("housing").value));
  sessionStorage.setItem("transportation", 
    parseInt(transportation) + parseInt(document.getElementById("transportation").value));
  sessionStorage.setItem("education", 
    parseInt(education) + parseInt(document.getElementById("education").value));
  sessionStorage.setItem("personal", 
    parseInt(personal) + parseInt(document.getElementById("personal").value));
  sessionStorage.setItem("savings", 
    parseInt(savings) + parseInt(document.getElementById("savings").value));
}
