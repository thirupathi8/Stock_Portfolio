import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

const Stock = sequelize.define("Stock", {
    stock_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    stock_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    avg_buy_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

export default Stock;