# Dev Burguer API

Uma API RESTful desenvolvida em Node.js para gerenciar um sistema de delivery de hambúrgueres. Permite o cadastro de usuários, gerenciamento de produtos e categorias, e controle de pedidos.

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login com JWT.
- **Gerenciamento de Produtos**: Criar, atualizar e listar produtos com upload de imagens.
- **Gerenciamento de Categorias**: Criar, atualizar e listar categorias com upload de imagens.
- **Controle de Pedidos**: Criar, atualizar e listar pedidos.
- **Autorização**: Diferenciação entre usuários comuns e administradores.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para construção de APIs.
- **Sequelize**: ORM para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **JWT (jsonwebtoken)**: Para autenticação baseada em tokens.
- **bcrypt**: Para hash de senhas.
- **Multer**: Para upload de arquivos (imagens de produtos e categorias).
- **Yup**: Para validação de dados.
- **Biome**: Para linting e formatação de código.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- pnpm (gerenciador de pacotes)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/dev-burguer-api.git
   cd dev-burguer-api
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure o banco de dados:
   - Crie um banco de dados PostgreSQL.
   - Atualize as configurações em `src/config/database.cjs` com suas credenciais.

4. Execute as migrações:
   ```bash
   pnpm run migrate
   ```

## Como Usar

1. Inicie o servidor em modo de desenvolvimento:
   ```bash
   pnpm run dev
   ```

2. O servidor estará rodando em `http://localhost:3000` (ou a porta configurada).

### Endpoints Principais

#### Usuários
- `POST /users` - Cadastrar novo usuário
- `POST /session` - Fazer login

#### Produtos (requer autenticação)
- `POST /products` - Criar produto (admin)
- `PUT /products/:id` - Atualizar produto (admin)
- `GET /products` - Listar produtos

#### Categorias (requer autenticação)
- `POST /categories` - Criar categoria (admin)
- `PUT /categories/:id` - Atualizar categoria (admin)
- `GET /categories` - Listar categorias

#### Pedidos (requer autenticação)
- `POST /orders` - Criar pedido
- `PUT /orders/:id` - Atualizar pedido
- `GET /orders` - Listar pedidos

### Autenticação
- Para endpoints protegidos, inclua o token JWT no header: `Authorization: Bearer <token>`.
- Usuários administradores têm acesso a operações de criação e atualização.

## Estrutura do Projeto

```
src/
├── app/
│   ├── controllers/     # Controladores da aplicação
│   ├── middlewares/     # Middlewares de autenticação
│   ├── models/          # Modelos do Sequelize
│   └── schemas/         # Esquemas de validação
├── config/              # Configurações (banco, auth, multer)
├── database/
│   ├── index.js         # Conexão com o banco
│   └── migrations/      # Migrações do Sequelize
├── routes.js            # Definição das rotas
├── app.js               # Configuração do Express
└── server.js            # Ponto de entrada da aplicação
uploads/                 # Diretório para arquivos enviados
```

## Scripts Disponíveis

- `pnpm start` - Inicia o servidor em produção
- `pnpm run dev` - Inicia o servidor em modo de desenvolvimento com watch
- `pnpm run migrate` - Executa as migrações do banco de dados

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

Eduardo Camargo de Matos