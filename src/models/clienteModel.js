import conn from "../config/conn.js"

const tabelaClientes = /*sql*/`
CREATE TABLE IF NOT EXISTS clientes(
 cliente_id VARCHAR(60) PRIMARY KEY,
 nome VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

conn.query(tabelaClientes,(err, result,field)=>{
 if(err){
  console.error("Erro ao criar tabela" + err.stack)
  return
 }
 console.log("Tabela [clientes] criada com sucesso")
})
