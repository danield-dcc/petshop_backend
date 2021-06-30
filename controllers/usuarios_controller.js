const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const knex = require("../database/dbConfig")

//trabalhando como class
module.exports = {

    //index: listagem
    //store/create: inclusão
    //update: alteração
    //show: retornar 1 arquivo
    //destroy: exclusão

    async index(req, res) {
        const usuarios = await knex("usuarios");
        res.status(200).json(usuarios);
    },

    async store(req, res) {
        // a desestruturação do objeto req.body
        const { nome, email, senha } = req.body;

        //validação para os campos
        if (!nome || !email || !senha) {
            res.status(400).json({ erro: "Enviar nome, email e senha do usuário" })
        }


        //verificando se o email já existe
        try {
            const dados = await knex("usuarios").where({ email });
            if (dados.length) {
                res.status(400).json({ erro: "Email já cadastrado" });
                return;
            }
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }





        //gerar um hash de uma senha a ser salva no banco
        const hash = bcrypt.hashSync(senha, 10)

        try {
            const novo = await knex("usuarios").insert({ nome, email, senha: hash })

            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async login(req, res) {
        const { email, senha } = req.body;

        //validação para os campos
        if (!email || !senha) {
            res.status(400).json({ erro: "Login ou senha incorretos" })
            return;
        }


        //verificando se o email já existe
        try {
            const dados = await knex("usuarios").where({ email });
            if (dados.length == 0) {
                res.status(400).json({ erro: "Login ou senha incorretos" }); //email invalido
                return;
            }

            if (bcrypt.compareSync(senha, dados[0].senha)) {

                //passando para usuario legitimo o token
                const token = jwt.sign({
                    usuario_id: dados[0].id,                //dados que encnotramos no tolken do usuario
                    usuario_nome: dados[0].nome
                }, process.env.JWT_KEY, {                     //salt
                    expiresIn: "1h"
                }
                );


                res.status(200).json({ token, user: dados[0].nome })
            } else {
                res.status(400).json({ erro: "Login ou senha incorretos" }); //senah invalida
            }
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }



    },
    //delete destroy
    async destroy(req, res) {
        const id = req.params.id;
        try {
            await knex('usuarios').del().where({ id })
            res.status(200).json("Usuário excluido com sucesso!")
        } catch (error) {
            res.status(400).json({ msg: error })
        }
    },


}