// Importação do Express //
import express from "express";
import routes from "./routes.js";

const app = express();

// Middleware para interpretar JSON
app.use(express.json());
// Middleware para interpretar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos (imagens, etc.)
import fileRouteConfig from "./config/fileRoutes.cjs";

app.use("/product-file", fileRouteConfig);
app.use("/category-file", fileRouteConfig);

// Importando as rotas
app.use(routes);

export default app;
