import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import symptomsRoutes from "./src/routes/symptoms.routes.js";
import dietPlanRoutes from "./src/routes/dietPlanRoutes.js";   // ✔ corrected

const app = express();  

dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/symptoms", symptomsRoutes);
app.use("/api/diet-plan", dietPlanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
