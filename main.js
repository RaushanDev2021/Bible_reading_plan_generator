const readingPlans = {
  "30days": [],
  "365days": []
};
  
  // Load full-year plan from JSON
  fetch('bible_365_plan.json')
    .then(response => response.json())
    .then(data => {
      readingPlans["30days"] = data["30days"];
      readingPlans["365days"] = data["365days"];
      console.log("Plans loaded:", {
        "30days": readingPlans["30days"].length,
        "365days": readingPlans["365days"].length
      });
    })
    .catch(err => {
      console.error("Error loading plans:", err);
    });
  
  function generatePlan() {
    const selected = document.getElementById("plan").value;
    const display = document.getElementById("planDisplay");
    const plan = readingPlans[selected];
    const startDateInput = document.getElementById("startDate").value;
  
    if (!plan || plan.length === 0) {
      display.innerHTML = "<p>No plan selected or still loading...</p>";
      return;
    }
  
    if (!startDateInput) {
      display.innerHTML = "<p>Please select a start date.</p>";
      return;
    }
  
    const startDate = new Date(startDateInput);
    display.innerHTML = `<h2>Your Reading Plan:</h2>`;
    const list = document.createElement("ul");
  
    plan.forEach((day, idx) => {
      const li = document.createElement("li");
      const date = new Date(startDate);
      date.setDate(date.getDate() + idx);
      const dateStr = date.toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
      });
      li.textContent = `${dateStr}: ${day}`;
      list.appendChild(li);
    });
  
    display.appendChild(list);
  }
  
  function downloadPDF() {
    const element = document.getElementById("planDisplay");
    const opt = {
      margin:       0.5,
      filename:     'bible-reading-plan.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  }
  