import "dotenv/config";
import express from "express";
import mysql from "mysql2";

const PORT = 3333;

const app = express();

//Receber dados em formato json
app.use(express.json());

//Criar conexão com o banco de dados
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "livraria3F",
  port: "3306",
});

//Conectar ao banco de dados
conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("MYSQL conectado!");

  app.listen(PORT, () => {
    console.log("Servidor on PORT " + PORT);
  });
});
