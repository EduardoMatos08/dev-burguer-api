module.exports = {
    development: {
        dialect: "postgres",
        host: "localhost",
        username: "admin",
        password: "myamazingpassword",
        database: "dev-burguer-db",
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
    },
};
