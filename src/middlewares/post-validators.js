import { body, param } from "express-validator";
import { postFound,validCourse } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createPostValidator = [
    body("title").notEmpty().withMessage("post title is required").isString().withMessage("post title cannot be diferent but a text"),
    body("description").notEmpty().withMessage("post description is required").isString().withMessage("post description cannot be diferent but a text"),
    body("course").notEmpty().withMessage("The course is required").isString().withMessage("Course cannot be diferent but a text").custom(validCourse),
    body("dueDate").notEmpty().withMessage("The due date is required").isDate().withMessage("Due date must be a valid date"),
    validateFields,
    handleErrors
]

export const getPostsValidator = [
    validateFields,
    handleErrors
]

export const findPostsValidator = [
    body("pid").optional().isMongoId().withMessage("The id provided is not a mongo valid id").custom(postFound),
    body("title").optional().isString().withMessage("post title cannot be diferent but a text"),
    body("creationDate").optional().isDate().withMessage("creation date must be a valid date"),
    body("course").optional().isString().withMessage("Course cannot be diferent but a text").custom(validCourse),
    body("dueDate").optional().isDate().withMessage("Due date must be a valid date"),
    validateFields,
    handleErrors
]

export const editPostValidator = [
    param("pid").isMongoId().withMessage("The id provided is not a mongo valid id").custom(postFound),
    body("title").optional().isString().withMessage("post title cannot be diferent but a text"),
    body("description").optional().isString().withMessage("post description cannot be diferent but a text"),
    body("course").optional().isString().withMessage("Course cannot be diferent but a text").custom(validCourse),
    body("dueDate").optional().isDate().withMessage("Due date must be a valid date"),
    validateFields,
    handleErrors
]

export const deletePostValidator = [
    param("pid").notEmpty().isMongoId().withMessage("The id provided is not a mongo valid id").custom(postFound),
    validateFields,
    handleErrors
]
