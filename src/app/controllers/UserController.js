import bcrypt from "bcrypt";
import { v4 } from "uuid";
import * as Yup from "yup";
import User from "../models/User.js";

class UserController {
    async store(req, res) {
        // Esquema de validação dos dados usando o Yup
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean().required(),
        });

        // Validar os dados recebidos da requisição
        try {
            schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ err: err.errors });
        }

        // Extrair os dados do corpo da requisição
        const { name, email, password, admin } = req.body;

        // Verificar se o e-mail já está cadastrado
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        // Hash de senha usando bcrypt
        const password_hash = await bcrypt.hash(password, 10);

        // Criar o usuário no banco de dados
        const user = {
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        };

        await User.create(user);

        return res.status(201).json({
            userId: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        });
    }
}

export default new UserController();
