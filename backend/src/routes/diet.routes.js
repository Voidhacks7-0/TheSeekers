import express from "express";
import DietPlan from "../models/DietPlan.js";
import { generateDietPlan } from "../utils/dietPlanLogic.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, age, weight, height, symptoms, healthGoals } = req.body;

    const { diet, exercise } = generateDietPlan({ age, weight, height, symptoms, healthGoals });

    const newPlan = new DietPlan({
      userId,
      age,
      weight,
      height,
      symptoms,
      healthGoals,
      diet,
      exercise,
    });

    await newPlan.save();

    res.status(201).json({ message: "Diet plan generated successfully", plan: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
