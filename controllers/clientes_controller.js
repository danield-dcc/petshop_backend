
const knex = require("../database/dbConfig")

//trabalhando como class
module.exports = {

    //index: listagem
    //store/create: inclusão
    //update: alteração
    //show: retornar 1 arquivo
    //destroy: exclusão

    async index(req, res) {
        //const clientes = await knex("clientes").orderBy("id");

        const clientes = await knex.select("c.id", "c.nome", "c.endereco", "c.cpf", "c.telefone", "caes.nome as nome_do_cachorro", "ra.nome as raca", "caes.foto")
            .from("clientes as c",)
            .leftJoin("caes_cadastrados as caes", "c.caes_cadastrados_id", "caes.id")
            .innerJoin("raca_cachorro as ra", "ra.id", "caes.raca_cachorro_id")
            .orderBy("c.id")
        res.status(200).json(clientes);
    },

    async store(req, res) {
        // a desestruturação do objeto req.body
        const { nome, endereco, cpf, telefone, caes_cadastrados_id } = req.body;

        //validação dos campos
        if (!nome || !endereco || !cpf || !telefone) {
            res.status(400).json({ erro: "Cadastrar nome, endereço, cpf, telefone" })
        }


        try {
            const novo = await knex("clientes").insert({ nome, endereco, cpf, telefone, caes_cadastrados_id })
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ error: messages })
        }
    },


    //alteração por id
    async update(req, res) {
        const id = req.params.id
        const { nome, endereco, cpf, telefone, caes_cadastrados_id } = req.body;

        try {
            await knex('clientes').update({ nome, endereco, cpf, telefone, caes_cadastrados_id }).where({ id })
            res.status(200).json({ msg: "Cliente alterado com sucesso" })
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }

    },

    //delete destroy
    async destroy(req, res) {
        const id = req.params.id;
        try {
            await knex('clientes').del().where({ id })
            res.status(200).json("Cliente excluido com sucesso!")
        } catch (error) {
            res.status(400).json({ msg: error })
        }
    },

    //show
    async show(req, res) {
        const {palavra} = req.params
        try {
            const clientes = await knex('clientes').where('nome', 'like', `%${palavra}%`)
                .orWhere('endereco', 'like', `%${palavra}%`)
                .orWhere('CPF', 'like', `%${palavra}%`)
                .orWhere('telefone', 'like', `%${palavra}%`)
            res.status(200).json(clientes)
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    },



}