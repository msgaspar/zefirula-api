# Zé Firula API

Uma API para criar e gerenciar ligas personalizadas do jogo CartolaFC, com atualização automática das pontuações a partir da API oficial do Cartola.

## Stack utilizada

- TypeScript
- Express
- TypeORM
- PostgreSQL
- JSON Web Token
- Prettier/ESLint
- Deploy na AWS EC2

## Executando o projeto localmente

### É necessário ter instalado

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://github.com/docker/compose)

### Execução com Docker Compose

1. Clone o repositório:

```
git clone https://github.com/msgaspar/zefirula-api.git
```

2. Entre no diretório do projeto:

```
cd zefirula-api
```

3. Instale as dependências

```
yarn
```

4. Crie na raiz do projeto uma cópia do arquivo ormconfig.example.json com o nome ormconfig.json:

```
cp ormconfig.example.json ormconfig.json
```

5. Inicie a aplicação usando o Docker Compose:

```
docker-compose up
```
