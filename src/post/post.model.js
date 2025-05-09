import { Schema, model } from "mongoose";
import Comment from "../comment/comment.model.js";

const postSchema = Schema({
    title: {
        type: String,
        required: [true, "post tittle is required"],
        maxLength: [80, "post tittle cannot exceed 80 characters"]
    },
    description: {
        type: String,
        required: [true, "activitys description information is required"],
        maxLength: [300, "post description  cannot exceed 300 characters"]
    },
    course: {
        type: String,
        enum: ["TECNOLOGIA", "TALLER", "PRACTICA SUPERVISADA"],
        required: [true, "post course is required"]
    },
    dueDate: {
        type: Date,
        required: [true, "due date is required"]
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

// eliminar comentarios junto con el post si se elimina
postSchema.post("findOneAndUpdate", async function (doc) {
    if (doc && doc.status === false) {
        await Comment.deleteMany({ post: doc._id });
    }
});

// eliminar post si se venció junto con sus comentarios
postSchema.pre("save", async function (next) {
    const now = new Date();
    if (this.dueDate && this.dueDate < now && this.status) {
        this.status = false;
        await Comment.deleteMany({ post: this._id });
    }
    next();
});

postSchema.methods.toJSON = function () {
    const { __v, _id, ...postDb } = this.toObject();
    postDb.pid = _id;
    return postDb;
};

export default model("Post", postSchema);
