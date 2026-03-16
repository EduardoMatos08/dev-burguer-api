module.exports = {
	development: {
		dialect: 'postgres',
		host: 'localhost',
		username: 'admin',
		password: '#081008Edu',
		database: 'dev-burguer-db',
		define: {
			timestamps: true,
			underscored: true,
			underscoredAll: true,
		},
	},
};
