require("dotenv").config(); 
const { Sequelize } = require("sequelize");

// database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,  
  process.env.DB_USER,  
  process.env.DB_PASSWORD,  
  {
    host: process.env.DB_HOST,  
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: console.log, 
  }
);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectToDatabase();
  

module.exports = sequelize;
