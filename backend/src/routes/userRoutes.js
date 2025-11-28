// src/routes/userRoutes.js
import express from "express";
const router = express.Router();
import HealthRecord from "../models/HealthRecord.js";
import { analyzeSymptoms } from "../utils/predictionLogic.js";


// Test route
router.post("/symptoms", async (req, res) => {
  try {
    const { userId, symptoms, familyHistory } = req.body;

    // AI prediction logic
    const { prediction, doctor } = analyzeSymptoms(symptoms, familyHistory);

    const newRecord = new HealthRecord({
      userId,
      symptoms,
      familyHistory,
      prediction,
      doctorSuggestion: doctor,
    });

    await newRecord.save();

    res.status(201).json({
      message: "Prediction generated successfully",
      prediction,
      doctor,
      record: newRecord
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
