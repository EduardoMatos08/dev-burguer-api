import * as Yup from "yup";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

class ProductController {
    // _-_- CRIAÇÃO DE PRODUTOS -_-_ //

    async store(req, res) {
        // Criando um schema de validação para os dados do produto
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            in_offer: Yup.boolean().required(),
            category_id: Yup.number().required(),
        });

        // Validando os dados do produto usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        // Desestruturando os dados do produto e o nome do arquivo da imagem do produto (path)
        const { name, price, in_offer, category_id } = req.body;
        const { filename } = req.file;

        // Criando um novo produto no banco de dados usando o modelo Product
        const newProduct = await Product.create({
            name,
            price,
            in_offer,
            category_id,
            path: filename,
        });
        return res.status(201).json(newProduct);
    }

    // _-_- ATUALIZAÇÃO DE PRODUTOS -_-_ //
    async update(req, res) {
        // Criando um schema de validação para os dados do produto
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            in_offer: Yup.boolean(),
            category_id: Yup.number(),
        });

        // Validando os dados do produto usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        // Desestruturando os dados do produto e o nome do arquivo da imagem do produto (path)
        const { name, price, in_offer, category_id } = req.body;
        const { filename } = req.file;
        const { id } = req.params;

        // Validação se o path (imagem) irá mudar ou não
        let path;

        if (filename) {
            path = filename;
        }

        // Atualizando um produto no banco de dados usando o modelo Product
        await Product.update(
            {
                name,
                price,
                in_offer,
                category_id,
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
            .json({ message: "Product updated successfully!" });
    }

    // _-_- LISTAGEM DE PRODUTOS -_-_ //

    async index(_req, res) {
        // Buscando todos os produtos no banco de dados usando método index() e o modelo Product
        const products = await Product.findAll({
            include: {
                model: Category,
                as: "category",
                attributes: ["id", "name"],
            },
        });
        return res.status(200).json(products);
    }
}

export default new ProductController();
