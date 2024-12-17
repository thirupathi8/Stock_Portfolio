import handleCalculateResult from "../controllers/returns.js";
import express from "express";

const router = express.Router()

router.get("/", handleCalculateResult)

export default router