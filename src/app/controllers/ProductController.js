import * as Yup from "yup";
import Product from "../models/Product.js";

class ProductController {
    async store(req, res) {
        // Criando um schema de validação para os dados do produto
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        });

        // Validando os dados do produto usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        // Criando um novo produto no banco de dados usando o modelo Product
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    }
}

export default new ProductController();
