const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("posts", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false, 
  });
  
  module.exports = Post;