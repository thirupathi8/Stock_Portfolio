import express from "express";
import { authenticateDatabase, syncDatabase } from "./database.js";
import stockRouter from "./routes/addStock.js";
import tradeRouter from "./routes/addTrade.js";
import updateRouter from "./routes/updateTrade.js";
import deleteRouter from "./routes/deleteTrade.js";
import retrieveRouter from "./routes/retrieveTrade.js";
import retrieveStock from "./routes/retrieveStock.js";
import returnRouter from "./routes/returns.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/addStock", stockRouter);
app.use("/addTrade", tradeRouter);
app.use("/updateTrade", updateRouter);
app.use("/deleteTrade", deleteRouter);
app.use("/fetchTrade", retrieveRouter);
app.use("/fetchStock", retrieveStock);
app.use("/returns", returnRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
(async () => {
    await authenticateDatabase();
    await syncDatabase();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
