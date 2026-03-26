import { Sequelize } from "sequelize";
import Product from "../app/models/Product.js";
import User from "../app/models/User.js";
import databaseConfig from "../config/database.cjs";

// Models
const models = [User, Product];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // DataBase
        this.connection = new Sequelize(databaseConfig.development);
        // Models
        models.map((model) => model.init(this.connection));
    }
}

export default new Database();
