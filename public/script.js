function submitForm() {
    const age = document.getElementById("age").value;
    const batch = document.getElementById("batch").value;
  
    if (age >= 18 && age <= 65) {
      alert(`Enrollment successful!\nAge: ${age}\nBatch: ${batch}\nMonthly Fee: Rs 500/-`);
    } else {
      alert("Sorry, only individuals between the age of 18 and 65 are eligible for enrollment.");
    }
  }
  