import handleRetrieveStock from "../controllers/retrieveStock.js";
import express from "express";

const router = express.Router()

router.get("/", handleRetrieveStock)

export default router