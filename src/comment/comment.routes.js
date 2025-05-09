import { Router } from "express";
import { createComment, getPostComments } from "./comment.controller.js";
import { createCommentValidator, getPostCommentsValidator } from "../middlewares/comment-validators.js";

const router = Router();

/**
 * @swagger
 * /comment/createComment/{pid}:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Create a new comment for a post
 *     description: Adds a new comment to a specific post by ID.
 *     operationId: createComment
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID of the post to comment on.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - content
 *             properties:
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *               content:
 *                 type: string
 *                 example: "Great post, very informative!"
 *     responses:
 *       201:
 *         description: Comment created successfully and linked to the post.
 *       400:
 *         description: Post not found or invalid data.
 *       500:
 *         description: Server error during comment creation.
 */
router.post("/createComment/:pid", createCommentValidator, createComment);

/**
 * @swagger
 * /comment/getPostComments/{pid}:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get comments for a post
 *     description: Retrieves all comments for a specific post, ordered by most recent first. Pagination supported.
 *     operationId: getPostComments
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID of the post to retrieve comments for.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Maximum number of comments to retrieve.
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: from
 *         required: false
 *         description: Number of comments to skip for pagination.
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully.
 *       400:
 *         description: Post not found or invalid ID.
 *       500:
 *         description: Error retrieving comments.
 */
router.get("/getPostComments/:pid", getPostCommentsValidator, getPostComments);

export default router;
