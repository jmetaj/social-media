const Comment = require("../models/comment");
const Post = require("../models/post");

//Create a comment
exports.createComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.postId;
    try {

        const post = await Post.findByPk(postId);
        if (!post) {
        return res.status(404).json({ error: "Post does not exist." });
        }

        const comment = await Comment.create({
            content,
            post_id: postId,
            user_id: req.user.userId,
        });

        res.status(201).json({ message: "Comment added successfully!", comment });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Edit a comment 
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: { id: req.params.id, user_id: req.user.userId },
        });

        if (!comment) {
            return res.status(403).json({ error: "You can only edit your own comments." });
        }

        await comment.update({ content: req.body.content });
        res.json({ message: "Comment updated successfully!", comment });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Delete a comment 
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: { id: req.params.id, user_id: req.user.userId },
        });

        if (!comment) {
            return res.status(403).json({ error: "You can only delete your own comments." });
        }

        await comment.destroy();
        res.json({ message: "Comment deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Fetch comments of a specific post
exports.getCommentsByPost = async (req, res) => {
    const { page , limit } = req.query;
    try {
        const comments = await Comment.findAll({
            where: { post_id: req.params.postId },
            offset: (page - 1) * limit,
            limit: parseInt(limit),
            order: [["created_at", "DESC"]],
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
