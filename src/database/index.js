import { Sequelize } from "sequelize";
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js";
import User from "../app/models/User.js";
import databaseConfig from "../config/database.cjs";

// Models
const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // DataBase
        this.connection = new Sequelize(databaseConfig.development);
        // Models
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models),
            );
    }
}

export default new Database();
