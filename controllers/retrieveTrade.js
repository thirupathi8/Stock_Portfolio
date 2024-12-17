import Trade from "../models/trade.js";

const handleRetrieveTrade = async (req, res) => {
    try {
        const trade = await Trade.findAll()
        res.status(200).json(trade)
    } catch (error) {
        console.error(`Error retrieveing trades ${error}`)
        return res.status(500).json({message: "Error retrieveing trades"})
    }
}

export default handleRetrieveTrade