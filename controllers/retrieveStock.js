import Stock from "../models/stock.js";

const handleRetrieveStock = async(req, res) => {
    try {
        const stock = await Stock.findAll()
        return res.status(200).json(stock)
    } catch (error) {
        console.error("Error during fetching", error)
        return res.status(500).json({message: "Error during retrieval"})
    }
}

export default handleRetrieveStock