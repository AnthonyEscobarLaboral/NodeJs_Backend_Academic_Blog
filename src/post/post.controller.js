import Comment from "../comment/comment.model.js";
import Post from "./post.model.js";

export const createPost = async (req, res) => {
    try {
        const postData = req.body;

        const postCreated = await Post.create(postData);

        return res.status(201).json({
            message: "Post created succesfully",
            information: {
                post: {
                    title: postCreated.title,
                    description: postCreated.description,
                    course: postCreated.course,
                    createdAt: postCreated.createdAt,
                    status: postCreated.status
                }
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Post   creation failed,check the information",
            error: err.message
        });
    }
};


export const getPosts = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, postsFound] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);


        return res.status(200).json({
            success: true,
            message: "Posts got successfully",
            total,
            Posts: postsFound
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get the posts",
            error: err.message
        });
    }
};

export const findPosts = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const { pid, course, dueDate, creationDate, title } = req.body;

        let filterParameter = { ...query };

        if (pid) filterParameter._id = pid;
        if (course) filterParameter.course = { $regex: course, $options: "i" };
        if (title) filterParameter.title = { $regex: title, $options: "i" };
        if (creationDate) {
            const date = new Date(creationDate);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            filterParameter.createdAt = {
                $gte: date,
                $lt: nextDay
            };
        }
        if (dueDate) {
            const date = new Date(dueDate);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            filterParameter.dueDate = {
                $gte: date,
                $lt: nextDay
            };
        }

        const [total, postsFound] = await Promise.all([
            Post.countDocuments(filterParameter),
            Post.find(filterParameter)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        if (total === 0) {
            return res.status(200).json({
                success: true,
                message: "No posts were found found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Posts found successfully",
            total,
            Posts: postsFound
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to find the posts you sought",
            error: err.message,
        });
    }
};


export const editPost = async (req, res) => {
    try {
        const { pid } = req.params;
        const newData = req.body;

        const found = await Post.findById(pid);
        if (!found) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });
        };


        const update = await Post.findByIdAndUpdate(pid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Post changes updated succesfully',
            Post: update
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update post changes, try again later',
            error: err.message
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { pid } = req.params;

        const found = await Post.findById(pid);
        if (!found) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });
        };

        const deleted = await Post.findByIdAndUpdate(pid, { status: false, title: `deleted ${found.title}` }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully ",
            Post_deleted: deleted
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete post",
            error: err.message
        });
    }
};