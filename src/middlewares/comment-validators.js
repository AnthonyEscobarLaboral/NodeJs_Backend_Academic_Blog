import { body, param } from "express-validator";
import { postFound, commentFound } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createCommentValidator = [
    param("pid").notEmpty().isMongoId().withMessage("The id provided is not a mongo valid id").custom(postFound),
    body("author").notEmpty().withMessage("authors name is required").isString().withMessage("Author name cannot be diferent but a text"),
    body("content").notEmpty().withMessage("Comments information is required").isString().withMessage("Comments information cannot be diferent but a text"),
    validateFields,
    handleErrors
]

export const getPostCommentsValidator = [
    param("pid").notEmpty().isMongoId().withMessage("The id provided is not a mongo valid id").custom(postFound),
    validateFields,
    handleErrors
]
