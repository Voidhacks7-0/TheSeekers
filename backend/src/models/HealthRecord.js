import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symptoms: { type: [String], required: true },
  familyHistory: { type: [String], default: [] }, // new
  prediction: { type: String }, // AI prediction
  doctorSuggestion: { type: String }, // Suggested doctor
  createdAt: { type: Date, default: Date.now }
});
const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

export default HealthRecord;
