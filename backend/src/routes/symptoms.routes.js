import express from "express";
import HealthRecord from "../models/HealthRecord.js";

const router = express.Router();

// POST route to save user symptoms
router.post("/", async (req, res) => {
  try {
    const { userId, symptoms } = req.body;

    if (!userId || !symptoms) {
      return res.status(400).json({ message: "userId and symptoms are required" });
    }

    const record = new HealthRecord({ userId, symptoms });
    await record.save();

    res.status(201).json({ message: "Symptoms recorded successfully ✅", record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
