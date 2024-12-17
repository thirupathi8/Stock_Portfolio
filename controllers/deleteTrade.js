import Trade from "../models/trade.js";
import Stock from "../models/stock.js";

const handleDeleteTrade = async(req, res) => {
    try {
        const { trade_id } = req.params;
    
        const existingTrade = await Trade.findByPk(trade_id)
        if(!existingTrade){
            return res.status(404).json({ message: "Trade not found" })
        }

        const stock = await Stock.findOne({where: {stock_id: existingTrade.stock_id}})
        if(!stock){
            return res.status(404).json({ message: "Stock not found" })
        }

        let newQuantity = 0, newAvgPrice = 0
        if(existingTrade.trade_type === "BUY"){
            newQuantity = stock.quantity - existingTrade.quantity
            if(newQuantity > 0){
                newAvgPrice = ((stock.avg_buy_price * stock.quantity) - (existingTrade.price * existingTrade.quantity)) / (stock.quantity - existingTrade.quantity)
            }
            else if(newQuantity === 0){
                newAvgPrice = 0
            }
            else{
                return res.status(400).json({message: "Deletion not possible"})
            }
        }

        else if(existingTrade.trade_type === "SELL"){
            newQuantity = stock.quantity + existingTrade.quantity
        }

        await existingTrade.destroy()

        await stock.update({
            quantity: newQuantity,
            avg_buy_price: newAvgPrice
        })

        return res.status(200).json({message: "Deletion successful"})
    } catch (error) {
        console.log("Error during deletion ", error)
        return res.status(500).json({message: "Error during deletion"})
    }
}

export default handleDeleteTrade