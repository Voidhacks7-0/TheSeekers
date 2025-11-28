console.log("HealthAI Guardian Dashboard Active");

// Utility: Smooth number animation
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 20);
    let current = start;

    let timer = setInterval(() => {
        current += increment;
        obj.textContent = Math.floor(current);
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            obj.textContent = end;
            clearInterval(timer);
        }
    }, 20);
}

// ------------------------------------
// LIVE HEART RATE SIMULATION
// ------------------------------------
setInterval(() => {
    let newHR = Math.floor(80 + Math.random() * 40);
    let hrStatus = document.getElementById("hr-status");

    animateValue("heart-rate", parseInt(document.getElementById("heart-rate").textContent), newHR, 400);

    if (newHR < 90) {
        hrStatus.textContent = "Normal range";
        hrStatus.style.color = "#70A1FF";
    } else if (newHR < 110) {
        hrStatus.textContent = "Elevated but normal";
        hrStatus.style.color = "#ffd86b";
    } else {
        hrStatus.textContent = "High • Reduce stress";
        hrStatus.style.color = "#ff6e6e";
    }
}, 3500);

// ------------------------------------
// LIVE STRESS LEVEL SIMULATION
// ------------------------------------
setInterval(() => {
    let stress = Math.floor(Math.random() * 70);
    let stressDesc = document.getElementById("stress-desc");
    let stressTag = document.getElementById("stress-tag");

    animateValue("stress-level", parseInt(document.getElementById("stress-level").textContent), stress, 400);
    document.getElementById("stress-progress").style.width = stress + "%";

    if (stress < 30) {
        stressDesc.textContent = "Relaxed — keep it up!";
        stressTag.textContent = "Low";
        stressTag.style.background = "#14321d";
        stressTag.style.color = "#4dff88";
    } else if (stress < 60) {
        stressDesc.textContent = "Breathing exercise recommended";
        stressTag.textContent = "Moderate";
        stressTag.style.background = "#3B2F15";
        stressTag.style.color = "#F7C24D";
    } else {
        stressDesc.textContent = "High stress — take a break!";
        stressTag.textContent = "High";
        stressTag.style.background = "#4a1b1b";
        stressTag.style.color = "#ff6e6e";
    }
}, 4000);

// ------------------------------------
// STEPS LIVE UPDATE
// ------------------------------------
setInterval(() => {
    let steps = Math.floor(7000 + Math.random() * 3000);
    let percent = Math.floor((steps / 10000) * 100);

    animateValue("steps-value", parseInt(document.getElementById("steps-value").textContent), steps, 300);

    document.getElementById("steps-progress").style.width = percent + "%";
    document.getElementById("steps-desc").textContent = percent + "% of daily goal";

    let change = Math.floor(Math.random() * 20) - 5;
    let changeTag = document.getElementById("step-change");

    changeTag.textContent = (change > 0 ? "+" : "") + change + "%";
    changeTag.style.color = change > 0 ? "#49FF8F" : "#FF6E6E";
}, 5000);

// ------------------------------------
// SLEEP SIMULATION (STATIC RANDOM DAILY)
// ------------------------------------
(function generateSleep() {
    let hours = 6 + Math.random() * 3;
    let mins = Math.floor(Math.random() * 60);

    document.getElementById("sleep-duration").textContent =
        `${Math.floor(hours)}h ${mins}m`;

    document.getElementById("sleep-quality").textContent =
        hours > 7 ? "Good" : "Average";

    let rem = Math.floor(60 + Math.random() * 60);
    document.getElementById("sleep-rem").textContent = `REM: ${Math.floor(rem / 60)}h ${rem % 60}m`;

    let sleepPercent = Math.min(100, Math.floor((hours / 8) * 100));
    document.getElementById("sleep-progress").style.width = sleepPercent + "%";
})();
