import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Academic Blog Backend API",
            version: "1.0.0",
            description:
                "blog de aprendizaje donde se publicarán las actividades de los tres cursos del área técnica. Este blog servirá como un registro organizado de los trabajos y proyectos de aprendizaje, accesible para cualquier visitante.",
            contact: {
                name: "Anthony Josue Escobar Ponce",
                email: "anthonyescobarponce@Outlook.com",
            },
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/academicBlog/v1",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/post/post.routes.js",
        "./src/comment/comment.routes.js",
    ],
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
