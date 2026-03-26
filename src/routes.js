// ROTAS DA APLICAÇÃO //

// Importando o Router do Express
import { Router } from "express";
// Importação dos Controllers
import ProductController from "./app/controllers/ProductController.js";
import SessionController from "./app/controllers/SessionController.js";
import UserController from "./app/controllers/UserController.js";

const routes = new Router(); // Instanciando o Router

// Rotas - Métodos HTTP//

// Rota POST - Cadastro de usuário
routes.post("/users", UserController.store);
// Rota POST - Login de usuário
routes.post("/session", SessionController.store);
// Rota POST - Criação de um novo produto
routes.post("/products", ProductController.store);

export default routes; // Exportando as rotas
