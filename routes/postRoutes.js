const express = require("express");
const {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getMyPosts,
    getUserPosts
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/", getAllPosts);
router.get("/my-posts", authMiddleware, getMyPosts);
router.get("/user/:userId", getUserPosts);

module.exports = router;
