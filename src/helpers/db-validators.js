import Comment from "../comment/comment.model.js"
import Post from "../post/post.model.js"

export const postFound = async (pid = " ") => {
    const found = await Post.findById(pid);
    if (!found) {
        throw new Error(`The post provided doesnt exists`);
    }
};

export const commentFound = async (cid = " ") => {
    const found = await Comment.findById(cid);
    if (!found) {
        throw new Error(`The comment provided doesnt exists`);
    }
};

export const validCourse = async (course = " ") => {
    const validCourses = ["TECNOLOGIA", "TALLER", "PRACTICA SUPERVISADA"];
    if (!validCourses.includes(course)) {
        throw new Error(`Invalid course provided, existent courses: ${validCourses.join(", ")}`);
    }
};