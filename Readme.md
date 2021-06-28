npm init -y

npm i express

npm i knex

npm i mysql2

npm install dotenv

npm install bcrypt

npm install jsonwebtoken


npx knex init
(para Rodar o knex)

npx knex migrate:make create_table_produtos
(cria o js que mais tarde cria a tabela)


npx knex mnigrate:latest
(cria os databases)

npx knex migrate:rollback
(desfaz o ultimo latest)