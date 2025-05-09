'use strict'
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import commentRoutes from "../src/comment/comment.routes.js";
import postRoutes from "../src/post/post.routes.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

class ExpressServer {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        try {
            await dbConnection();
        } catch (err) {
            console.log(`Database connection failed: ${err}`);
            process.exit(1);
        }
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use("/academicBlog/v1/comments", commentRoutes);
        this.app.use("/academicBlog/v1/posts", postRoutes);
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default ExpressServer;

