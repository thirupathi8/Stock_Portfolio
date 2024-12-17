import Stock from "../models/stock.js";
import Trade from "../models/trade.js";

const handleAddTrade = async (req, res) => {
    try {
        const { stock_name, trade_type, quantity, price } = req.body;

        const stock = await Stock.findOne({ where: { stock_name } });
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        let newQuantity = stock.quantity;
        let newAvgPrice = stock.avg_buy_price;

        if (trade_type === "BUY") {
            newQuantity += quantity;
            newAvgPrice =
                (stock.avg_buy_price * stock.quantity + price * quantity) /
                newQuantity;
        } else if (trade_type === "SELL") {
            if (quantity > stock.quantity) {
                return res.status(400).json({ message: "Insufficient stock quantity" });
            }
            newQuantity -= quantity;
            if (newQuantity === 0) {
                newAvgPrice = 0;
            } else {
                newAvgPrice = stock.avg_buy_price;
            }
        }

        await Trade.create({
            stock_id: stock.stock_id,
            trade_type,
            quantity,
            price,
        });

        await stock.update({ 
            quantity: newQuantity, 
            avg_buy_price: newAvgPrice 
        });
        res.status(201).json({ message: "Trade processed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default handleAddTrade;
