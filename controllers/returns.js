import Stock from "../models/stock.js";

const handleCalculateResult = async(req, res) => {
    try {
        const stocks = await Stock.findAll()
        if(!stocks){
            return res.status(404).json({message: "No stocks found"})
        }
        let cumulativeReturns = 0
        let currentPrice = 100
        stocks.forEach(stock => {
            cumulativeReturns += (currentPrice - stock.avg_buy_price) * stock.quantity
        });

        return res.status(200).json({message: `Cumulative Returns is ${cumulativeReturns}`})
    } catch (error) {
        console.error("Error during calculation")
        return res.status(500).json({message: "Error during calculation"})
    }

}

export default handleCalculateResult