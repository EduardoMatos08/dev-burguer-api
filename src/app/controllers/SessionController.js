import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Yup from "yup";
import authConfig from "../../config/auth.cjs";
import User from "../models/User.js";

class SessionController {
    async store(req, res) {
        // Criando o schema para validação dos dados usando o Yup
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        // Recebendo os dados do usuário
        const { email, password } = req.body;

        // Verificação do e-mail com o schema
        const isValid = await schema.isValid(req.body, {
            abortEarly: false,
            strict: true,
        });

        // Verificar se o e-mail está cadastrado
        const existingUser = await User.findOne({ where: { email } });

        // Verificar se a senha é válida
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password_hash,
        );

        // Verificar se o e-mail está é válido, se o e-mail está cadastrado e se a senha está correta
        if (!isValid || !existingUser || !isPasswordValid) {
            return res
                .status(400)
                .json({ error: "E-mail or password is invalid!" });
        }

        // Gerar o token JWT para autenticação do usuário
        const token = jwt.sign(
            { id: existingUser.id, admin: existingUser.admin },
            authConfig.secret,
            {
                expiresIn: authConfig.expiresIn,
            },
        );

        // Retornar os dados do usuário com sucesso
        return res.status(201).json({
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            token,
        });
    }
}

export default new SessionController();
