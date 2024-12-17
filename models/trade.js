import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import Stock from "./stock.js";

const Trade = sequelize.define("Trade", {
    trade_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    trade_type: {
        type: DataTypes.ENUM("BUY", "SELL"),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

Trade.belongsTo(Stock, { foreignKey: "stock_id" });

export default Trade;
