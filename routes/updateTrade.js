import express from "express";
import handleUpdateTrade from "../controllers/updateTrade.js";

const router = express.Router();

router.patch("/:trade_id", handleUpdateTrade)

export default router;