import jwt from "jsonwebtoken";
import authConfig from "../../config/auth.cjs";

const authMiddleware = (req, res, next) => {
    // Extrai o token do cabeçalho "Authorization
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ error: "Token not provided!" });
    }

    const token = authToken.split(" ")[1]; // Extrai o token (removendo o "Bearer ")

    // Verifica a validade do token usando o segredo definido em authConfig
    try {
        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if (error) {
                throw Error();
            }

            req.userId = decoded.id; // Armazena o ID do usuário decodificado no objeto de requisição
            req.userName = decoded.name; // Armazena o nome do usuário decodificado no objeto de requisição
            req.isAdmin = decoded.admin; // Armazena a informação de admin no objeto de requisição
        });
    } catch (_error) {
        return res.status(401).json({ error: "Invalid token!" });
    }

    return next(); // Continua para a próxima função de middleware ou rota
};
export default authMiddleware;
