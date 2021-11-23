# Zé Firula API

Uma API para criar e gerenciar ligas personalizadas do jogo CartolaFC, com atualização automática das pontuações a partir da API oficial do Cartola.

## Stack utilizada

- TypeScript
- Express
- TypeORM
- PostgreSQL
- JSON Web Token
- Redis
- Prettier/ESLint
- Deploy na AWS EC2

## Executando o projeto localmente

#### É necessário ter instalado

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://github.com/docker/compose)

#### Siga os passos abaixo

```bash
# Clone o repositorio
$ git clone https://github.com/msgaspar/zefirula-api.git

# Entre no diretório do projeto:
$ cd zefirula-api

# Instale as dependências
$ yarn

# Crie na raiz do projeto uma cópia do arquivo ormconfig.example.json com o nome ormconfig.json:
$ cp ormconfig.example.json ormconfig.json

# Inicie os bancos de dados PostgreSQL e Redis usando o Docker Compose:
$ docker-compose up -d postgres redis

# Rode as migrações do banco de dados com o comando:
$ yarn typeorm migration:run

# Crie as credenciais de admin no banco de dados:
$ yarn seed:admin

# Inicie a aplicação
$ yarn dev
```
