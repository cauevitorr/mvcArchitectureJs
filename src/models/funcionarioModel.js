import conn from "../config/conn.js"

const tabelaFuncionario = /*sql*/`
CREATE TABLE IF NOT EXISTS funcionarios(
 funcionario_id VARCHAR(60) PRIMARY KEY,
 nome VARCHAR(255) NOT NULL,
 cargo VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 salario DECIMAL(10,2) NOT NULL,
 data_contratacao DATE NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

conn.query(tabelaFuncionario,(err, result,field)=>{
 if(err){
  console.error("Erro ao criar tabela" + err.stack)
  return
 }
 console.log("Tabela [funcionarios] criada com sucesso")
})
