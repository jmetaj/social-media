const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./post");
const Comment = require("./comment");


const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
            msg: "Invalid email format. Please enter a valid email address."
          }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false, 
  });

  User.hasMany(Post, { 
    foreignKey: "user_id"
},
 );

 /*Post.belongsTo(User, { foreignKey: "user_id" });
 
  User.hasMany(Comment, { 
    foreignKey: "user_id",
    } 
);

Comment.belongsTo(User, { foreignKey: "user_id"});*/

module.exports = User;