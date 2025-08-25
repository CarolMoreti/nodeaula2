## Objetivo

Nesta aula, vamos criar uma API RESTful para cadastro de produtos utilizando
Node.js e Express. Também vamos criar um frontend simples para interagir com a API.

## Pré-requisitos

- Node.js e npm instalados
- Um editor de código (ex: VS Code)
- Um navegador web
- Git (opcional)


### 1. Backend

O backend é responsável por fornecer os dados para o frontend. 
Ele é uma API RESTful que permite listar, criar e deletar produtos.

#### 1.1. Estrutura de Pastas do Backend

```
projeto-produtos/
└── backend/
    ├── data/
    │   └── products.json
    ├── middleware/
    │   └── cors.js
    ├── models/
    │   └── Product.js
    ├── routes/
    │   └── products.js
    ├── package.json
    └── server.js
```

- `data/products.json`: Arquivo JSON que armazena os produtos.
- `middleware/cors.js`: Middleware para habilitar o CORS.
- `models/Product.js`: Modelo de dados para os produtos.
- `routes/products.js`: Rotas da API para os produtos.
- `package.json`: Arquivo de configuração do projeto Node.js.
- `server.js`: Arquivo principal do servidor.

#### 1.2. Instalando as dependências

Navegue até a pasta do backend e instale as dependências:

```bash
cd projeto-produtos/backend
npm install
```

#### 1.3. Iniciando o servidor

Para iniciar o servidor, execute o comando:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

### 2. Frontend

O frontend é responsável por exibir os dados para o usuário e permitir a 
interação com a API.

#### 2.1. Estrutura de Pastas do Frontend

```
projeto-produtos/
└── frontend/
    ├── index.html
    ├── scripts.js
    └── style.css
```

- `index.html`: Estrutura da página web.
- `scripts.js`: Código JavaScript para interagir com a API.
- `style.css`: Estilos da página.

#### 2.2. Abrindo o frontend

Abra o arquivo `projeto-produtos/frontend/index.html` em seu navegador.

### 3. Testando a Aplicação

- Abra o `index.html` no navegador.
- Você verá a lista de produtos.
- Você pode adicionar novos produtos através do formulário.
- Você pode deletar produtos clicando no botão "Excluir".

### 4. Endpoints da API

A API possui os seguintes endpoints:

- `GET http://localhost:3000/api/products`: Listar todos os produtos.
- `POST http://localhost:3000/api/products`: Criar um novo produto.
- `GET http://localhost:3000/api/products/:id`: Buscar um produto pelo ID.
- `DELETE http://localhost:3000/api/products/:id`: Deletar um produto pelo ID.

Você pode usar Thunder Client no VSCode para testar os endpoints da API.

## Conclusão

Nesta aula, criamos uma API RESTful com Node.js e 
um frontend simples para interagir com ela. Aprendemos sobre a 
estrutura de um projeto Node.js, como criar rotas, como usar middlewares e 
como interagir com uma API a partir do frontend.