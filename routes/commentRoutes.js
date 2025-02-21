const express = require("express");
const {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPost
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId", authMiddleware, createComment);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);
router.get("/post/:postId", getCommentsByPost);

module.exports = router;
