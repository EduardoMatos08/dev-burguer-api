import * as Yup from "yup";
import Category from "../models/Category.js";

class CategoryController {
    async store(req, res) {
        // Criando um schema de validação para os dados do produto
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        // Validando os dados do produto usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        // Desestruturando os dados da categoria
        const { name } = req.body;
        const { filename } = req.file;

        // Verificar se o e-mail já está cadastrado
        const existingCategory = await Category.findOne({ where: { name } });

        if (existingCategory) {
            return res
                .status(400)
                .json({ error: "Category already registered!" });
        }

        // Criando um novo produto no banco de dados usando o modelo Category
        const newCategory = await Category.create({
            name,
            path: filename,
        });
        return res.status(201).json(newCategory);
    }

    async update(req, res) {
        // Criando um schema de validação para os dados da categoria
        const schema = Yup.object({
            name: Yup.string(),
            path: Yup.string(),
        });

        // Validando os dados da categoria usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        // Desestruturando os dados do produto e o nome do arquivo da imagem da categoria (path)
        const { filename } = req.file;
        const { name } = req.body;
        const { id } = req.params;

        // Validação se o path (imagem) irá mudar ou não
        let path;

        if (filename) {
            path = filename;
        }

        // Atualizando uma categoria no banco de dados usando o modelo Category
        await Category.update(
            {
                name,
                path,
            },
            {
                where: {
                    id,
                },
            },
        );
        return res
            .status(200)
            .json({ message: "Category updated successfully!" });
    }

    async index(_req, res) {
        // Buscando todas as categorias no banco de dados usando método index() e o modelo Category
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    }
}

export default new CategoryController();
