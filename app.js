const express = require("express");
require("dotenv").config();
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

//Sync Database Before Starting Server
sequelize.sync({ force: false })
  .then(() => {
    console.log("Database connected & synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Database sync error:", error);
  });
