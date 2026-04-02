const adminAuthMiddleware = (req, res, next) => {
    const isAdmin = req.isAdmin;

    if (!isAdmin) {
        return res.status(403).json();
    }

    return next(); // Continua para a próxima função de middleware ou rota
};
export default adminAuthMiddleware;
