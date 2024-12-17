import Stock from "../models/stock.js";

const handleAddStock = async (req, res) => {
    try {
        const { stock_name } = req.body;
        const existingStock = await Stock.findOne({ where: { stock_name } });

        if (existingStock) {
            return res.status(400).json({ message: "Stock already exists" });
        }

        await Stock.create({ stock_name });
        res.status(201).json({ message: "Stock added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default handleAddStock;