# Port Louis - Desafio Backend (API de Contatos)

Esta é uma API RESTful desenvolvida como parte do processo seletivo para a posição de Desenvolvedor Back End Jr. na Port Louis. A aplicação gerencia uma lista de contatos, permitindo a criação, listagem, atualização e exclusão (CRUD) de registros, com validações de regras de negócio integradas.

O projeto foi construído focando em **Clean Code**, separação de responsabilidades (Arquitetura em Camadas: Controllers, Services, Repositories) e uso de Prepared Statements para segurança contra SQL Injection.

## Tecnologias Utilizadas

- **Node.js** com **Express** (Framework Web)
- **MySQL2** (Comunicação com o banco de dados via queries puras)
- **Dotenv** (Gerenciamento de variáveis de ambiente)
- **Nodemon** (Ambiente de desenvolvimento)

## Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- Um servidor [MySQL](https://www.mysql.com/) rodando localmente

## Configuração do Ambiente

1. Clone o repositório e acesse a pasta do projeto:
   ```bash
   git clone https://github.com/josiasdev/port-louis-backend-challenge
   cd port-louis-backend-challenge
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo .env na raiz do projeto com as suas credenciais do MySQL. Você pode usar o modelo abaixo:
    ```
        PORT=3000
        DB_HOST=localhost
        DB_USER=seu_usuario_mysql
        DB_PASSWORD=sua_senha_mysql
        DB_NAME=portlouis_contacts
    ```

## Banco de Dados
Execute o script SQL abaixo no seu cliente MySQL (como MySQL Workbench, DBeaver ou via terminal) para criar o banco de dados e a tabela necessária:
```
CREATE DATABASE portlouis_contacts;

USE portlouis_contacts;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL
);
```

## Como Executar a Aplicação
Para iniciar o servidor em modo de desenvolvimento:

```
npm run dev
```

O servidor estará rodando em http://localhost:3000

## Endpoints da API
Abaixo estão as rotas disponíveis na aplicação:

| Método | Rota          | Descrição                     | Regras Adicionais                                          |
| ------ | ------------- | ----------------------------- | ---------------------------------------------------------- |
| POST   | /contatos     | Cria um novo contato          | O nome deve ter no mínimo duas palavras com 3 letras cada. |
| GET    | /contatos     | Lista todos os contatos       | -                                                          |
| PATCH  | /contatos/:id | Atualiza um contato existente | Retorna 404 se o ID não existir. Valida o nome novamente.  |
| DELETE | /contatos/:id | Exclui um contato             | Retorna status 204 (No Content) em caso de sucesso.        |

Exemplo de Corpo da Requisição (POST / PATCH):
```json
{
  "name": "João Silva",
  "phone": "11988887777"
}
```

