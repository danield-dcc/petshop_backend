const express = require("express");
const routes = express.Router()
const cors = require("cors");

routes.use(cors());

const caes_cadastrados_controller = require('./controllers/caes_cadastrados_controller')
const usuarios_controller = require('./controllers/usuarios_controller')
const login = require("./middleware/login")
const clientes_controller = require("./controllers/clientes_controller");
const raca_cachorro_controller = require("./controllers/raca_cachorro_controller");
const banho_tosa = require("./controllers/banho_tosa_controller")


// routes.get("/caes", (req, res) =>{
//     res.send("Rota de Cães Cadastrados")//teste de rota
// })

//

routes.get("/caes", caes_cadastrados_controller.index)
    .post("/caes", caes_cadastrados_controller.store)
    .get("/caes/destaques", caes_cadastrados_controller.index_destaque)   //rota para mostrar detaques
    .put("/caes/destacar/:id", caes_cadastrados_controller.update)       /*alterar destacar*/
    .get("/caes/filtrar/:palavra", caes_cadastrados_controller.show)
    .get("/caes/buscar_id/:id", caes_cadastrados_controller.show_id)         //procura utilizando id
    .get("/caes/dados", caes_cadastrados_controller.indexDados)   //dados estatisticos
    .delete("/caes/:id",caes_cadastrados_controller.destroy)
    .put("/caes/atualizar/:id",caes_cadastrados_controller.update_comum)      //editar cao
    .get("/caes/buscar/:palavra", caes_cadastrados_controller.show_caes)
    .get("/caes/pesquisa/:palavra", caes_cadastrados_controller.search)         //busca dinamica
    


routes.get("/usuarios", usuarios_controller.index)
    .post("/usuarios", usuarios_controller.store)
    .post("/login", usuarios_controller.login)
    .delete("/usuarios/:id", usuarios_controller.destroy)


routes.get("/clientes", clientes_controller.index)
    .post("/clientes", /*login,*/ clientes_controller.store)
    .put("/clientes/atualizar/:id", clientes_controller.update)
    .delete("/clientes/:id", clientes_controller.destroy)
    .get("/clientes/buscar/:palavra", clientes_controller.show)


routes.get("/raca", raca_cachorro_controller.index)
    .post("/raca", login, raca_cachorro_controller.index)
    .get("/raca/dados", raca_cachorro_controller.raca_caes)

    
routes.get("/banho_tosa", banho_tosa.index)
    .post("/banho_tosa", /*login,*/ banho_tosa.store)
    .put("/banho_tosa/:id", banho_tosa.update)
    .delete("/banho_tosa/:id", banho_tosa.destroy)
    .get("/banho_tosa/buscar/:palavra", banho_tosa.show)




module.exports = routes