import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "admin123", {
    host: "localhost",
    port: 5433,
    dialect: "postgres",
});

const authenticateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log("Database schema synced successfully.");
    } catch (error) {
        console.error("Failed to sync", error.message);
        process.exit(1);
    }
};

export { sequelize, authenticateDatabase, syncDatabase };
