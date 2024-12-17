import express from "express";
import handleDeleteTrade from "../controllers/deleteTrade.js";

const router = express.Router()

router.delete("/:trade_id", handleDeleteTrade)

export default router