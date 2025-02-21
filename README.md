This is a simple project social media platform where users can register, log in, create posts, and comment on posts.

```
Technologies Used:
Node.js 
Express.js 
Sequelize 
JWT (JSON Web Tokens) 
MySQL for the database
```
```
env file:
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_NAME=your-database-name
DB_PASSWORD=your-database-password
DB_USER=your-database-user
APP_PORT=your-APP-port
JWT_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
```
The project was testing with Postman. All the requests to test the API are available in the public folder.

Start the server:
npm start

File Descriptions:

app.js
The main file.

models/
Sequelize models for User, Post, and Comment.

controllers/
Contains business logic for handling requests and responses for users, posts, and comments.

routes/
 the API routes for the app  /login, /register, /posts, /comments etc.

middleware/
Contains authMiddleware.js to handle JWT verification and authentication.






