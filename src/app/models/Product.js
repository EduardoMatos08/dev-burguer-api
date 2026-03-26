import Sequelize, { Model } from "sequelize";

// Product vai representar a tabela "products" no banco de dados, e o modelo é definido usando o Sequelize
class Product extends Model {
    static init(sequelize) {
        Model.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.DECIMAL(10, 2),
                category: Sequelize.STRING,
                path: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "products",
            },
        );
    }
}

export default Product;
