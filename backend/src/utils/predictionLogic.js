export function analyzeSymptoms(symptoms, familyHistory) {
  let prediction = "Unknown condition";
  let doctor = "General Physician";

  // Example AI rules
  if (symptoms.includes("fever") && symptoms.includes("cough")) {
    prediction = "Possible Flu or Viral Infection";
    doctor = "General Physician";
  }

  if (symptoms.includes("chest pain") || symptoms.includes("shortness of breath")) {
    prediction = "Possible Heart Issue";
    doctor = "Cardiologist";
  }

  if (symptoms.includes("increased thirst") || symptoms.includes("frequent urination")) {
    prediction = "Possible Diabetes";
    doctor = "Endocrinologist";
  }

  // Genetic logic
  if (familyHistory.includes("diabetes") && prediction === "Possible Diabetes") {
    prediction += " (Higher risk due to family history)";
  }

  return { prediction, doctor };
}
