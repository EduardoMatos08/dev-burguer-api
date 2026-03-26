// Express
import app from "./app.js";
// Conexão com o Banco de Dados
import "./database/index.js";

// Configuração da Porta
app.listen(3001, () => {
    console.log("Rodando na porta: 3001!");
});
