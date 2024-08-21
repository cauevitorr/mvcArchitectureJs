import "dotenv/config";
import express from "express";

//conexão com o banco de dados
// import conn from "./config/conn"

//Importação dos modelos e criação das tabelas
import "./models/livroModel.js"
import "./models/funcionarioModel.js"
import "./models/clienteModel.js"

//Importação das Rotas
import livrosRoutes from "./routes/livrosRoutes.js"
import funcionariosRoutes from "./routes/funcionariosRoutes.js"
import clientesRoutes from "./routes/clientesRoutes.js"

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true}))
//Receber dados em formato json
app.use(express.json());

//Utilização das rotas 
//http://localhost:3333/livros
app.use("/livros", livrosRoutes)
app.use("/funcionarios", funcionariosRoutes)
app.use("/clientes", clientesRoutes)

app.get("/", (request, response)=>{
 response.send("hello, world!")
})

app.listen(PORT, () =>{
 console.log("Servidor on PORT" + PORT)
})


