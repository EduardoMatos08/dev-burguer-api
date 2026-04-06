import * as Yup from "yup";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../schemas/order.js";

class OrderController {
    // _-_- CRIAÇÃO DE PEDIDOS -_-_ //

    async store(req, res) {
        // Criando um schema de validação para os dados do produto
        const schema = Yup.object({
            products: Yup.array()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    }),
                )
                .required(),
        });

        // Validando os dados do produto usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        // Informações do usuário:
        const { userId, userName } = req;

        // Usuário enviando requesição com informações dos produtos:
        const { products } = req.body;
        // Recebendo apenas os id's dos produtos por meio de um array de id's
        const productsId = products.map((product) => product.id);
        // Recebendo apenas os produtos com os id's requeridos e suas categorias
        const allOfProducts = await Product.findAll({
            where: {
                id: productsId,
            },
            include: {
                model: Category,
                as: "category",
                attributes: ["name"],
            },
        });

        // Recebendo apenas as informações que queremos dos objetos de produtos
        const selectedInfoOfProducts = allOfProducts.map((product) => {
            // Definindo a quantidade
            const quantity = products.find(
                (bodyProduct) => bodyProduct.id === product.id,
            ).quantity;

            // Inserindo as informações num objeto
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                quantity: quantity,
                url: product.id,
            };

            return newProduct;
        });

        // Enviando informações conforme o Schema do Mongo
        const order = [
            {
                user: {
                    id: userId,
                    name: userName,
                },
                products: selectedInfoOfProducts,
                status: "Pedido realizado.",
            },
        ];

        // Armazenando pedido no MongoDB
        const newOrder = await Order.create(order);

        return res.status(201).json({ message: "Order created!", newOrder });
    }

    async update(req, res) {
        // Criando um schema de validação para os dados do produto
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        // Validando os dados do produto usando o schema criado
        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (error) {
            return res.status(400).json({ errors: error.errors });
        }

        const { status } = req.body;
        const { id } = req.params;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return res.status(400).json({errror: err.message})
        }

        return res.status(200).json({ message: "Updated successfully!" });
    }

    async index(_req, res) {
        // Buscando todos os pedidos no banco de dados usando método index() e o modelo Order
        const orders = await Order.find();
        return res.status(200).json(orders);
    }
}

export default new OrderController();
