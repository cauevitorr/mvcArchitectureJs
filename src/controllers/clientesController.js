import conn from "..config/conn.js"
import {v4 as uuidv4} from "uuid"

export const getClientes = (request, response) => {
 const sql = /*sql*/ `SELECT * FROM clientes`;
 conn.query(sql, (err, data) => {
  if (err) {
   console.error(err);
   response.status(500).json({ err: "Erro so buscar cliente" });
   return;
  }
  const clientes = data;
  response.status(200).json(clientes);
 });
};

export const  postClientes = (request, response) => {
 const { nome, email } = request.body;

 //validações
 if (!nome) {
  response.status(400).json({ err: "o nome é obrgatório" });
 }
 if (!email) {
  response
   .status(400).json({ err: "o email é obrgatório" });
 }

 //verificar se o cliente não foi cadastrado
 const checkSql = /*sql*/ `SELECT * FROM clientes where email = "${email}"`;
 conn.query(checkSql, (err, data) => {
  if (err) {
   console.log(err);
   response.status(500).json({ err: "Erro ao buscar cliente" });
   return;
  }
  if (data.length > 0) {
   response.status(409).json({ err: "email já foi cadastrado" });
   return;
  }

  //cadastrar o cliente
  const id = uuidv4();
  const insertSql = /*sql*/ ` INSERT INTO clientes(cliente_id, nome, email) VALUES("${id}", "${nome}", "${email}")`;

  conn.query(insertSql, (err) => {
   if (err) {
    console.error(err);
    response.status(500).json({ err: "Erro ao cadastrar o cliente" });
    return;
   }
   response.status(201).json({ message: "cliente cadastrado" });
  });
 });
};

export const getClientesId = (request, response) => {
 const { nome, email } = request.body;

 //validações
 if (!nome) {
  response.status(400).json({ err: "o nome é obrgatório" });
 }
 if (!email) {
  response
   .status(400).json({ err: "o email é obrgatório" });
 }

 //verificar se o cliente não foi cadastrado
 const checkSql = /*sql*/ `SELECT * FROM clientes where email = "${email}"`;
 conn.query(checkSql, (err, data) => {
  if (err) {
   console.log(err);
   response.status(500).json({ err: "Erro ao buscar cliente" });
   return;
  }
  if (data.length > 0) {
   response.status(409).json({ err: "email já foi cadastrado" });
   return;
  }

  //cadastrar o cliente
  const id = uuidv4();
  const insertSql = /*sql*/ ` INSERT INTO clientes(cliente_id, nome, email) VALUES("${id}", "${nome}", "${email}")`;

  conn.query(insertSql, (err) => {
   if (err) {
    console.error(err);
    response.status(500).json({ err: "Erro ao cadastrar o cliente" });
    return;
   }
   response.status(201).json({ message: "cliente cadastrado" });
  });
 });
};

export const putClientes = (request, response) => {
 const { id } = request.params;
 const { nome, email} = request.body;

 if (!nome) {
  response.status(400).json({ err: "O nome é obrigatório" });
  return;
 }
 if (!email) {
  response.status(400).json({ err: "O email é obrigatório" });
  return;
 }

  const sql = /*sql*/ ` SELECT * FROM clientes WHERE cliente_id = "${id}"`;
  conn.query(sql, (err, data) => {
   if (err) {
    console.error(err);
    response.status(500).json({ err: "Erro ao buscar o cliente" });
    return;
   }

   if (data.length === 0) {
    response.status(404).json({ err: "cliente não encontrado" });
   }

   // Se o email está disponivel
   const checkEmailSql = /*sql*/`SELECT * FROM clientes WHERE email = "${email}" AND cliente_id != "${id}"`
   conn.query(checkEmailSql, (err, data)=>{
    if (err) {
     console.error(err)
     response.status(500).json({err:"Erro ao procurar cliente"})
     return
    }
    if (data.length > 0) {
     response.status(400).json({err:"Email já existe"})
    }
   })

   const updateSql = /*sql*/ `UPDATE clientes SET 
    nome = "${nome}", email = "${email}" WHERE cliente_id = "${id}"`;

   conn.query(updateSql, (err, info) => {
    if (err) {
     console.error(err);
     response.status(500).json({ err: "Erro ao atualizar o cliente" });
     return;
    }
    console.log(info);
    response.status(201).json({ message: "cliente atualizado" });
   });
  });
};

export const deleteClientes = (request, response) => {
 const { id } = request.params;

 const deleletSql = /*sql*/ `DELETE FROM clientes WHERE cliente_id = "${id}"`;

 conn.query(deleletSql, (err, info) => {
  if (err) {
   console.error(err);
   response.status(500).json({ err: "Erro ao deletar cliente" });
   return;
  }

  if (info.affectedRows === 0) {
   response.status(200).json({ mesage: "cliente deletado" });
  }
 });
};
