import Trade from "../models/trade.js";
import Stock from "../models/stock.js";

const handleUpdateTrade = async (req, res) => {
    try {
        const { trade_id } = req.params;
        const { trade_type, quantity, price } = req.body;

        const existingTrade = await Trade.findByPk(trade_id);
        if (!existingTrade) {
            return res.status(404).json({ message: "Trade not found" });
        }

        const stock = await Stock.findOne({ where: { stock_id: existingTrade.stock_id } });
        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        let newQuantity = 0, newAvgPrice = 0

        if (existingTrade.trade_type === "BUY") {
            newQuantity = stock.quantity - existingTrade.quantity
            if(newQuantity > 0){
                newAvgPrice = ((stock.avg_buy_price * stock.quantity) - (existingTrade.price * existingTrade.quantity)) / (stock.quantity - existingTrade.quantity)
            }
            else if(newQuantity === 0){
                newAvgPrice = 0
            }
            else{
                return res.status(400).json({message: "Cannot perform operation"})
            }
        } else if (existingTrade.trade_type === "SELL") {
            newQuantity = stock.quantity + existingTrade.quantity
        }

        if (trade_type === "BUY") {
            newAvgPrice = ((newAvgPrice * newQuantity) + (price * quantity)) / (newQuantity + quantity);
            newQuantity = newQuantity + quantity;
        } else if (trade_type === "SELL") {
            if (quantity > newQuantity) {
                return res.status(400).json({ message: "Insufficient stock quantity" });
            }
            newQuantity = newQuantity - quantity;
            console.log("New average price at Update: ",newAvgPrice)
        }

        await existingTrade.update({
            trade_type,
            quantity,
            price,
        });

        await stock.update({
            avg_buy_price: newAvgPrice,
            quantity: newQuantity,
        });

        return res.status(200).json({ message: "Trade updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default handleUpdateTrade;
