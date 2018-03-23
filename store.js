var prevHousing, 
    prevTransportation, 
    prevEducation, 
    prevPersonal, 
    prevSavings;

function update() {
  // get previous values if defined, else set to 0
  prevHousing = sessionStorage.getItem("housing") || 0;
  prevTransportation = sessionStorage.getItem("transportation") || 0;
  prevEducation = sessionStorage.getItem("education") || 0;
  prevPersonal = sessionStorage.getItem("personal") || 0;
  prevSavings = sessionStorage.getItem("savings") || 0;

  // get current values just submitted by user
  curIncome = document.getElementById("income").value;
  curHousing = document.getElementById("housing").value;
  curTransportation = document.getElementById("transportation").value;
  curEducation = document.getElementById("education").value;
  curPersonal = document.getElementById("personal").value;
  curSavings = document.getElementById("savings").value;

  // add current values to previous values and store the new cumulative total
  sessionStorage.setItem("income", parseInt(curIncome));
  sessionStorage.setItem("housing", parseInt(prevHousing) + parseInt(curHousing));
  sessionStorage.setItem("transportation", parseInt(prevTransportation) + parseInt(curTransportation));
  sessionStorage.setItem("education", parseInt(prevEducation) + parseInt(curEducation));
  sessionStorage.setItem("personal", parseInt(prevPersonal) + parseInt(curPersonal));
  sessionStorage.setItem("savings", parseInt(prevSavings) + parseInt(curSavings));

  // reset input field values to 0
  var inputs = document.querySelectorAll("input");
  for(var i=0; i<inputs.length; i++) {
    inputs[i].value = 0;
  }
}
