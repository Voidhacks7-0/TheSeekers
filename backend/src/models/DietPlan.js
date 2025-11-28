import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  symptoms: { type: [String], default: [] },
  healthGoals: { type: [String], required: true },
  diet: { type: [String], required: true },
  exercise: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);
export default DietPlan;
