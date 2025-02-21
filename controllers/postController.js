const Post = require("../models/post");

//Create new post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Post.create({ title, content, user_id: req.user.userId });
        res.status(201).json({ message: "Post created successfully!", post });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Update a post 
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id, user_id: req.user.userId } });

        if (!post) {
            return res.status(403).json({ error: " You can only edit your own posts." });
        }

        await post.update(req.body);
        res.json({ message: "Post updated successfully!", post });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Delete a post 
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id, user_id: req.user.userId } });

        if (!post) {
            return res.status(403).json({ error: "You can only delete your own posts." });
        }

        await post.destroy();
        res.json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    const { page, limit } = req.query;
    try {
        const posts = await Post.findAll({
            offset: (page - 1) * limit,
            limit: parseInt(limit),
            order: [["created_at", "DESC"]],
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//get posts of the logged-in user 
exports.getMyPosts = async (req, res) => {
    const { page, limit } = req.query;
    try {
        const posts = await Post.findAll({
            where: { user_id: req.user.userId },
            offset: (page - 1) * limit,
            limit: parseInt(limit),
            order: [["created_at", "DESC"]],
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Get other user's posts
exports.getUserPosts = async (req, res) => {
    const { page, limit } = req.query;
    try {
        const posts = await Post.findAll({
            where: { user_id: req.params.userId },
            offset: (page - 1) * limit,
            limit: parseInt(limit),
            order: [["created_at", "DESC"]],
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
