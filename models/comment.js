const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("comments", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      
    },
    post_id: {
        type:  DataTypes.INTEGER,
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


  
  module.exports = Comment;