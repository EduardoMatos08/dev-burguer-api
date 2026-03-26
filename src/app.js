// Importação do Express //
import express from "express";
import routes from "./routes.js";

const app = express();

app.use(express.json()); // Middleware para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar dados de formulário

// Importando as rotas
app.use(routes);

export default app;
