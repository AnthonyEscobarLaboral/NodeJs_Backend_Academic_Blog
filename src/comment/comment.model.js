import { Schema, model } from "mongoose";

const commentSchema = Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    author: {
        type: String,
        required: [true, "author name is required"],
        maxLength: [30, "author name cannot exceed 30 characters"]
    },
    content: {
        type: String,
        required: [true, "comments information is required"],
        maxLength: [300, "comments information cannot exceed 300 characters"]
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

commentSchema.methods.toJSON = function () {
    const { __v, _id, ...commentDb } = this.toObject();
    commentDb.cid = _id;
    return commentDb;
};

export default model("Comment", commentSchema);
