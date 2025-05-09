import { Router } from "express";
import { createPost, getPosts, findPosts, editPost, deletePost } from "./post.controller.js";
import { createPostValidator, getPostsValidator, findPostsValidator, editPostValidator, deletePostValidator } from "../middlewares/post-validators.js";

const router = Router();

/**
 * @swagger
 * /post/createPost:
 *   post:
 *     tags:
 *       - Post
 *     summary: Create a new post
 *     description: Creates a new post with the given title, description, course, and due date.
 *     operationId: createPost
 *     requestBody:
 *       description: Post data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - course
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Proyecto Arduino"
 *               description:
 *                 type: string
 *                 example: "Crear un sistema con Arduino para medir temperatura."
 *               course:
 *                 type: string
 *                 enum: ["TECNOLOGIA", "TALLER", "PRACTICA SUPERVISADA"]
 *                 example: "TECNOLOGIA"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       500:
 *         description: Server error during post creation.
 */
router.post("/createPost", createPostValidator, createPost);

/**
 * @swagger
 * /post/getPosts:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get all active posts
 *     description: Retrieves all posts with active status, paginated.
 *     operationId: getPosts
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of posts to retrieve.
 *       - in: query
 *         name: from
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of posts to skip for pagination.
 *     responses:
 *       200:
 *         description: Posts retrieved successfully.
 *       500:
 *         description: Error retrieving posts.
 */
router.get("/getPosts", getPostsValidator, getPosts);

/**
 * @swagger
 * /post/findPosts:
 *   post:
 *     tags:
 *       - Post
 *     summary: Find posts using filters
 *     description: Search posts using optional filters such as title, course, creation date, due date, or ID.
 *     operationId: findPosts
 *     requestBody:
 *       description: Filters to apply
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *               title:
 *                 type: string
 *               course:
 *                 type: string
 *               creationDate:
 *                 type: string
 *                 format: date
 *               dueDate:
 *                 type: string
 *                 format: date
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results to return.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip for pagination.
 *     responses:
 *       200:
 *         description: Filtered posts retrieved successfully.
 *       500:
 *         description: Error while searching for posts.
 */
router.post("/findPosts", findPostsValidator, findPosts);

/**
 * @swagger
 * /post/editPost/{pid}:
 *   put:
 *     tags:
 *       - Post
 *     summary: Edit a post
 *     description: Update post information by ID.
 *     operationId: editPost
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to edit.
 *     requestBody:
 *       description: Post data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               course:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       400:
 *         description: Post not found or invalid data.
 *       500:
 *         description: Error updating post.
 */
router.put("/editPost/:pid", editPostValidator, editPost);

/**
 * @swagger
 * /post/deletePost/{pid}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: Delete a post
 *     description: Soft delete a post and its comments by ID.
 *     operationId: deletePost
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete.
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       400:
 *         description: Post not found.
 *       500:
 *         description: Error deleting post.
 */
router.delete("/deletePost/:pid", deletePostValidator, deletePost);

export default router;
