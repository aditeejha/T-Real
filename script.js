// Get form and result elements
const form = document.getElementById("time-form");
const resultSection = document.getElementById("result");

const userEstimateSpan = document.getElementById("user-estimate");
const realTimeSpan = document.getElementById("real-time");
const biasSpan = document.getElementById("bias");

// Listen for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page reload

    // Read input values
    const estimatedTime = Number(document.getElementById("estimated-time").value);
    const availableTime = Number(document.getElementById("available-time").value);
    const timeUnit = document.getElementById("time-unit").value;
    const interruptions = document.querySelector('input[name="interruptions"]:checked').value;

    // Convert available time to hours per day
    let hoursPerDay = timeUnit === "per-week"
        ? availableTime / 7
        : availableTime;

    // Apply realism factor
    if (interruptions === "yes") {
        hoursPerDay *= 0.6; // reduce productivity
    } else {
        hoursPerDay *= 0.8;
    }

    // Convert estimated hours to days
const estimatedDays = estimatedTime / hoursPerDay;

// Calculate realistic time (adding realism buffer)
const realisticDays = estimatedDays * 1.3;

// Calculate optimism bias
const biasPercent = Math.round(((realisticDays - estimatedDays) / estimatedDays) * 100);


    // Update UI
    userEstimateSpan.textContent = estimatedDays.toFixed(1) + " days";
realTimeSpan.textContent = realisticDays.toFixed(1) + " days";

    biasSpan.textContent = biasPercent + "% underestimated";

    // Show result section
    resultSection.style.display = "block";
});
