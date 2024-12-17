import express from "express";
import handleAddStock from "../controllers/addStock.js";

const router = express.Router();
router.post("/", handleAddStock);

export default router;
