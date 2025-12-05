import express from "express";
import { getFoodInfo } from "../controllers/externalController.js";

const router = express.Router();

// Endpoint pentru OpenFoodFacts
router.get("/food/:barcode", getFoodInfo);

export default router;
