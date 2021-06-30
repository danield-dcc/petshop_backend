
const knex = require("../database/dbConfig")

//trabalhando como class
module.exports = {

    //index: listagem
    //store/create: inclusão
    //update: alteração
    //show: retornar 1 arquivo
    //destroy: exclusão

    async index(req, res) {
        // const caes = await knex("caes_cadastrados").orderBy("id", "desc");
        //trazer a descrição do relacioanamento e não somente o seu id

        const caes = await knex
            .select("c.id", "c.nome", "r.nome as raca", "c.idade", "c.foto", "c.destaque")
            .from("caes_cadastrados as c")
            .leftJoin("raca_cachorro as r", "c.raca_cachorro_id", "r.id")
            .orderBy("c.id", "desc")

        res.status(200).json(caes);
    },

    //pesquiza dinamica
    async search(req, res) {
        const palavra = req.params.palavra;

        const caes = await knex
            .select("c.id", "c.nome", "r.nome as raca", "c.idade", "c.foto", "c.destaque")
            .from("caes_cadastrados as c")
            .leftJoin("raca_cachorro as r", "c.raca_cachorro_id", "r.id")
            .where('c.nome', 'like', `%${palavra}%`)
            .orWhere('raca_cachorro_id', 'like', `%${palavra}%`)
            .orWhere('idade', 'like', `%${palavra}%`)
            .orWhere('r.nome', 'like', `%${palavra}%`)
            .orderBy("c.id", "desc");
        res.status(200).json(caes);
    },




    async store(req, res) {

        console.log(req.body)

        // faz a desestruturação do objeto req.body
        const { nome, idade, raca_cachorro_id, foto } = req.body;

        if (!nome) {
            res.status(400).json({
              erro: "faltou nome",
            });
            return;
          }

        //validação para os campos
        if (!nome || !idade || !raca_cachorro_id || !foto) {
            res.status(400).json({ erro: "Enviar nome, raca_cachorro_id, idade e foto" });
            return;
        }

        try {
            const novo = await knex("caes_cadastrados").insert({ nome, idade, raca_cachorro_id, foto });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },


    //mostar destaque
    async index_destaque(req, res) {
        
        // try {
        //     const destaques = await knex("caes_cadastrados").where({ destaque: true })
        //     res.status(200).json( destaques );
        // } catch (error) {
        //     res.status(400).json({ error: error.message })
        // }


        
        try{
           const destaques = await knex.select("c.id", "c.nome", "r.nome as raca","c.raca_cachorro_id", "c.idade", "c.foto", "c.destaque")
            .from("caes_cadastrados as c")
            .leftJoin("raca_cachorro as r", "c.raca_cachorro_id", "r.id")
            .where("c.destaque", true)
            .orderBy("c.id", "desc")
            res.status(200).json(destaques) 
        }catch (error) {
                res.status(400).json({ error: error.message })
            }



        
        // try{
        //     const destaques = await knex("caes_cadastrados").where({ destaque: true })
        //             .select("a.id", "c.nome as cliente", "caes.nome as nome_do_cachorro", "ra.nome as raca", "caes.foto", "c.idade")
        //             .from("agendamento_banho_tosa as a")
        //             .leftJoin("clientes as c","a.cliente_id", "c.id")
        //             .innerJoin("caes_cadastrados as caes", "a.caes_cadastrados_id", "caes.id")
        //             .innerJoin("raca_cachorro as ra", "ra.id", "caes.raca_cachorro_id")
        //             .orderBy("a.id")
        //             res.status(200).json( destaques );
        // }catch{
        //     res.status(400).json({ error: error.message })
        // }
        

        
    },

    //destacar
    //alteração por id
    async update(req, res) {
        const id = req.params.id
        const { destaque } = req.body;


        try {
            const existeId = await knex("caes_cadastrados").where({ id }).select("caes_cadastrados.id") //verificar se há o id
            if (existeId.find(e => e.id == id)) {

                const destaqueStatus = await knex("caes_cadastrados").where({ id }).select("caes_cadastrados.destaque")
                if (destaqueStatus.find(e => e.destaque == true)) {   //se verdadeiro passa para falso
                    await knex("caes_cadastrados").update({ destaque: false }).where({ id })
                    res.status(200).json({ msg: "Atualizado para não destacar" });
                } else if (destaqueStatus.find(e => e.destaque == false)) {
                    await knex("caes_cadastrados").update({ destaque: true }).where({ id })
                    res.status(200).json({ msg: "Atualizado para destacar" });
                }
            } else {
                res.status(400).json({ msg: "Erro. Id não encontrado" })
                return
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    },


    //filtro
    async show(req, res, next) {
        const { palavra } = req.params
        try {
            const caes = await knex('caes_cadastrados').where('nome', 'like', `%${palavra}%`)

            const usuaios = await knex('usuarios').where('nome', 'like', `%${palavra}%`)

            const clientes = await knex('clientes').where('nome', 'like', `%${palavra}%`)
                .orWhere('endereco', 'like', `%${palavra}%`)
                .orWhere('CPF', 'like', `%${palavra}%`)
                .orWhere('telefone', 'like', `%${palavra}%`)

            const raca = await knex('raca_cachorro').where('nome', 'like', `%${palavra}%`)

            if (caes.length == 0 && usuaios.length == 0 && clientes.length == 0 && raca.length == 0) {

                res.status(400).json({ msg: "Nenhum item com este nome encontrado" })
            } else {
                res.status(200).json({ caes, usuaios, clientes, raca })
            }
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }

    },


    //estatistica
    async indexDados(req, res) {

        try {
            const dados_caes = await knex("caes_cadastrados")
                .count({ total: "*" })
                .min({ menorIdade: "idade" })
                .max({ maiorIdade: "idade" })
                .sum({ qtdDestaques: "destaque" })
                .avg({ mediaIdade: "idade" })

            //Pega dos dados diretamente de table bt   
            const dados_agendamentos = await knex("agendamento_banho_tosa")
                .count({ totalAgendamentos: "*" })
                .sum({ valorTotal: "preco" })

            const { total, menorIdade, maiorIdade, qtdDestaques, mediaIdade } = dados_caes[0];
            const { totalAgendamentos, valorTotal } = dados_agendamentos[0];
            res.status(200).json({ total, menorIdade, maiorIdade, qtdDestaques, mediaIdade: Number(mediaIdade).toFixed(2), totalAgendamentos, valorTotal: Number(valorTotal).toFixed(2) })

        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    },

    //delete destroy
    async destroy(req, res) {
        const id = req.params.id;
        try {
            await knex('caes_cadastrados').del().where({ id })
            res.status(200).json("Pet excluido com sucesso!")
        } catch (error) {
            res.status(400).json({ msg: error })
        }
    },


    //alteração por id
    async update_comum(req, res) {
        const id = req.params.id
        const { nome, idade, raca_cachorro_id, foto } = req.body;

        try {
            await knex('caes_cadastrados').update({ nome, idade, raca_cachorro_id, foto }).where({ id })
            res.status(200).json({ msg: `Pet alterado com sucesso` })
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }

    },

    async show_caes(req, res) {
        const { palavra } = req.params
        try {
            const clientes = await knex('caes_cadastrados').where('nome', 'like', `%${palavra}%`)
                .orWhere('raca_cachorro_id', 'like', `%${palavra}%`)
                .orWhere('idade', 'like', `%${palavra}%`)
                .orWhere('foto', 'like', `%${palavra}%`)
            res.status(200).json(clientes)
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    },

    //traz a busca utilizando id
    async show_id(req, res) {
        const id = req.params.id
       // const { id } = req.params

        const caes = await knex
            .select("c.id", "c.nome", "r.nome as raca","c.raca_cachorro_id", "c.idade", "c.foto", "c.destaque")
            .from("caes_cadastrados as c")
            .leftJoin("raca_cachorro as r", "c.raca_cachorro_id", "r.id")
            .where("c.id", id)

        res.status(200).json(caes[0]);
    },

    
}