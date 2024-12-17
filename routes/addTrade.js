import express from "express";
import handleAddTrade from "../controllers/addTrade.js";

const router = express.Router();
router.post("/", handleAddTrade);

export default router;
