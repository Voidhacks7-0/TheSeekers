export function generateDietPlan({ age, weight, height, symptoms, healthGoals }) {
  let diet = [];
  let exercise = [];

  // Basic example rules (can be expanded)
  if (healthGoals.includes("weight loss")) {
    diet = ["High protein breakfast", "Vegetable salad for lunch", "Light dinner"];
    exercise = ["30 min walking", "15 min cardio"];
  }

  if (healthGoals.includes("muscle gain")) {
    diet = ["Oats + eggs breakfast", "Chicken and rice lunch", "Protein shake dinner"];
    exercise = ["Weight training 45 min", "Stretching 15 min"];
  }

  if (symptoms.includes("diabetes")) {
    diet.push("Low sugar foods");
    exercise.push("Daily 30 min walking");
  }

  return { diet, exercise };
}
