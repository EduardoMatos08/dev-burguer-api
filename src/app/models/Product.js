import Sequelize, { Model } from "sequelize";

// Product vai representar a tabela "products" no banco de dados, e o modelo é definido usando o Sequelize
class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.DECIMAL(10, 2),
                in_offer: Sequelize.BOOLEAN,
                category_id: Sequelize.INTEGER,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        // Local precisa ser alterado para o domínio onde a aplicação está hospedada
                        return `http://localhost:3001/product-file/${this.path}`;
                    },
                },
            },
            {
                sequelize,
                tableName: "products",
            },
        );

        return this;
    }

    // Definindo a associação entre Product e Category
    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: "category_id",
            as: "category",
        });
    }
}

export default Product;
