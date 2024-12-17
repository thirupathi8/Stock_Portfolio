import express from "express";
import handleRetrieveTrade from "../controllers/retrieveTrade.js";

const router = express.Router()

router.get("/", handleRetrieveTrade)

export default router