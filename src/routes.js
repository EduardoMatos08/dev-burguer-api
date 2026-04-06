// ROTAS DA APLICAÇÃO //

// Importando o Router do Express
import { Router } from "express";
// Importando o Multer para lidar com uploads de arquivos
import multer from "multer";
// Importação dos Controllers
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import ProductController from "./app/controllers/ProductController.js";
import SessionController from "./app/controllers/SessionController.js";
import UserController from "./app/controllers/UserController.js";
// Middlewares de autenticação
import adminAuthMiddleware from "./app/middlewares/adminAuth.js";
import authMiddleware from "./app/middlewares/auth.js";
// Configurações do Multer
import multerConfig from "./config/multer.cjs";

// Instanciando o Router
const routes = new Router();

// Configurando o Multer com as opções definidas
const upload = multer(multerConfig);

// Rotas - Métodos HTTP//

// -_- CAMADA SEM AUTENTICAÇÃO -_- //

// -_-_- USUÁRIOS -_-_- //

// Rota POST - Cadastro de usuário
routes.post("/users", UserController.store);
// Rota POST - Login de usuário
routes.post("/session", SessionController.store);

// -_- CAMADA DE AUTENTICAÇÃO POR TOKEN -_- //

routes.use(authMiddleware); // Aplicando o middleware de autenticação para as rotas seguintesadminAuthMiddleware

// -_-_- PRODUTOS -_-_- //

// Rota POST - Criação de um novo produto com uma imagem, e com uma Middleware para lidar com o upload do arquivo (campo "file")
routes.post(
    "/products",
    adminAuthMiddleware,
    upload.single("file"),
    ProductController.store,
);
// Rota PUT - Atualização de um produto pelo id nos querry params
routes.put(
    "/products/:id",
    adminAuthMiddleware,
    upload.single("file"),
    ProductController.update,
);
// Rota GET - Listagem de todos os produtos
routes.get("/products", ProductController.index);

// -_-_- CATEGORIAS -_-_- //

// Rota POST - Criação de uma nova categoria
routes.post(
    "/categories",
    adminAuthMiddleware,
    upload.single("file"),
    CategoryController.store,
);
// Rota PUT - Atualização de uma categoria pelo id nos querry params
routes.put(
    "/categories/:id",
    adminAuthMiddleware,
    upload.single("file"),
    CategoryController.update,
);
// Rota GET - Listagem de todas as categorias
routes.get("/categories", CategoryController.index);

// -_-_- PEDIDOS -_-_- //

// Rota POST - Criação de pedidos
routes.post("/orders", OrderController.store);
// Rota PUT - Atualização de pedidos
routes.put("/orders/:id", OrderController.update);
// Rota GET - Listagem de todos os pedidos
routes.get("/orders", OrderController.index);

export default routes; // Exportando as rotas
