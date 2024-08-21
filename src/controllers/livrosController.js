import conn from "../config/conn.js"
import {v4 as uuidv4} from "uuid"

export const getLivros =  (request, response) => {
 const sql = /*sql*/ `SELECT * FROM livros`;
 conn.query(sql, (err, data) => {
   if (err) {
     console.error(err);
     response.status(500).json({ err: "Erro so buscar livro" });
     return;
   }
   const livros = data;
   response.status(200).json(livros);
 });
};

export const postLivros = (request, response) => {
 const { titulo, autor, ano_publicacao, genero, preco } = request.body;

 //validações
 if (!titulo) {
   response.status(400).json({ err: "o titulo é obrgatório" });
 }
 if (!autor) {
   response.status(400).json({ err: "o autor é obrgatório" });
 }
 if (!ano_publicacao) {
   response.status(400).json({ err: "o ano de publicação é obrgatório" });
 }
 if (!genero) {
   response.status(400).json({ err: "o gênero é obrgatório" });
 }
 if (!preco) {
   response.status(400).json({ err: "o preço é obrgatório" });
   return;
 }

 //verificar se o livro não foi cadastrado
 const checkSql = /*sql*/ `SELECT * FROM livros where titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;
 conn.query(checkSql, (err, data) => {
   if (err) {
     console.log(err);
     response.status(500).json({ err: "Erro ao buscar livro" });
     return;
   }
   if (data.length > 0) {
     response.status(409).json({ err: "Livro já foi cadastrado" });
     return;
   }

   //cadastrar o livro
   const id = uuidv4();
   const disponibilidade = 1;
   const insertSql = /*sql*/ ` INSERT INTO livros(livro_id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) VALUES("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}", "${preco}", "${disponibilidade}")`;

   conn.query(insertSql, (err) => {
     if (err) {
       console.error(err);
       response.status(500).json({ err: "Erro ao cadastrar o livro" });
       return;
     }
     response.status(201).json({ message: "Livro cadastrado" });
   });
 });
};

export const getLivrosId =  (request, response) => {
 const { id } = request.params;
 const sql = /*sql*/ `SELECT * FROM livros WHERE livros_id = "${id}"`;
 conn.query(sql, (err, data) => {
   if (err) {
     console.error(err);
     response.status(500).json({ err: "Erro ao buscar livro" });
     return;
   }
   if (data.length === 0) {
     response.status(404).json({ err: "Livro não encontrado" });
     return;
   }
   const livro = data[0];
   response.status(200).json(livro);
 });
};

export const putLivros = (request, response) => {
 const { id } = request.params;
 const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } =
   request.body;

 if (!titulo) {
   response.status(400).json({ err: "O titulo é obrigatório" });
   return;
 }
 if (!autor) {
   response.status(400).json({ err: "O autor é obrigatório" });
   return;
 }
 if (!ano_publicacao) {
   response.status(400).json({ err: "O ano de publicação é obrigatório" });
   return;
 }
 if (!genero) {
   response.status(400).json({ err: "O genero é obrigatório" });
   return;
 }
 if (!preco) {
   response.status(400).json({ err: "O preço é obrigatório" });
   return;
 }
 if (!disponibilidade === undefined) {
   response.status(400).json({ err: "A disponibilidade é obrigatória" });
   return;
 }

 const sql = /*sql*/ ` SELECT * FROM livros WHERE livros_id = "${id}"`;
 conn.query(sql, (err, data) => {
   if (err) {
     console.error(err);
     response.status(500).json({ err: "Erro ao buscar o livro" });
     return;
   }

   if (data.length === 0) {
     response.status(404).json({ err: "Livro não encontrado" });
   }

   const updateSql = /*sql*/ `UPDATE livros SET 
   titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}",
   genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}"
   WHERE livros_id = "${id}"
   `;

   conn.query(updateSql, (err, info) => {
     if (err) {
       console.error(err);
       response.status(500).json({ err: "Erro ao atualizar o livro" });
       return;
     }
     console.log(info);
     response.status(200).json({ message: "Livro atualizado" });
   });
 });
};

export const deleteLivros =  (request, response) => {
 const { id } = request.params;

 const deleletSql = /*sql*/ `DELETE FROM livros WHERE livros_id = "${id}"`;

 conn.query(deleletSql, (err, info) => {
   if (err) {
     console.error(err);
     response.status(500).json({ err: "Erro ao deletar livro" });
     return;
   }

   if (info.affectedRows === 0) {
     response.status(200).json("Livro deletado");
   }
 });
};
