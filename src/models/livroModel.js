import conn from "../config/conn.js"

const tabelaLivro = /*sql*/`
CREATE TABLE IF NOT EXISTS livros(
 livro_id VARCHAR(60) PRIMARY KEY,
 titulo VARCHAR(255) NOT NULL,
 autor VARCHAR(255) NOT NULL,
 ano_publicacao YEAR(4) NOT NULL,
 preco DECIMAL(10,2) NOT NULL,
 disponibilidade BOOLEAN,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

conn.query(tabelaLivro,(err, result,field)=>{
 if(err){
  console.error("Erro ao criar tabela" + err.stack)
  return
 }
 console.log("Tabela [livros] criada com sucesso")
})
