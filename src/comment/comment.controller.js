import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
    try {
        const { pid } = req.params;
        const commentInformation = req.body;

        const post = await Post.findById(pid);

        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            });
        }

        const comment = await Comment.create({
            ...commentInformation,
            post: pid
        });

        return res.status(201).json({
            message: "Comment created succesfully and added to the post",
            information: {
                post: {
                    title: post.title,
                    course: post.course
                },
                comment: comment.content,
                author: comment.author,
                createdAt: comment.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Comment creation failed,check the information",
            error: err.message
        });
    }
};


export const getPostComments = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const { pid } = req.params;


        const filterParameter = { status: true, post: pid };

        const [total, commentsFound] = await Promise.all([
            Comment.countDocuments(filterParameter),
            Comment.find(filterParameter)
                .sort({ createdAt: -1 })
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        const comments = commentsFound.map(comment => ({
            author: comment.author,
            content: comment.content,
            createdAt: comment.createdAt
        }));

        return res.status(200).json({
            success: true,
            message: "Comments list got successfully",
            total,
            comments
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get post comments",
            error: err.message
        });
    }
};
