import Sequelize, { Model } from "sequelize";

// Category vai representar a tabela "categories" no banco de dados, e o modelo é definido usando o Sequelize
class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        // Local precisa ser alterado para o domínio onde a aplicação está hospedada
                        return `http://localhost:3001/category-file/${this.path}`;
                    },
                },
            },
            {
                sequelize,
                tableName: "categories",
            },
        );
        return this;
    }
}

export default Category;
