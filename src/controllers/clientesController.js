import conn from "../config/conn.js"
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
 const checkSql = /*sql*/ `SELECT * FROM clientes where ?? = ?`;
 const checkData = ["email", email]
 conn.query(checkSql, checkData, (err, data) => {
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
  const insertSql = /*sql*/ ` INSERT INTO clientes(??, ??, ??) VALUES( ?, ?, ?)`;
  const insertData = [ "cliente_id", "nome", "email", id, nome, email ]
  
  conn.query(insertSql, insertData, (err) => {
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
 const checkSql = /*sql*/ `SELECT * FROM clientes where ?? = ?`;
 const checkData = ["email", email]

 conn.query(checkSql, checkData, (err, data) => {
  if (err) {
   console.log(err);
   response.status(500).json({ err: "Erro ao buscar cliente" });
   return;
  }
  if (data.length > 0) {
   response.status(409).json({ err: "email já foi cadastrado" });
   return;
  }
});
}

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

  const sql = /*sql*/ ` SELECT * FROM clientes WHERE ?? = ?`;
  const checkData = ["cliente_id", id]
  conn.query(sql, checkData, (err, data) => {
   if (err) {
    console.error(err);
    response.status(500).json({ err: "Erro ao buscar o cliente" });
    return;
   }

   if (data.length === 0) {
    response.status(404).json({ err: "cliente não encontrado" });
   }

   // Se o email está disponivel
   const checkEmailSql = /*sql*/`SELECT * FROM clientes WHERE ?? = ? AND ?? != ?`
   const checkEmailExistsData = ["email", email, "cliente_id", id]

   conn.query(checkEmailSql, checkEmailExistsData, (err, data)=>{
    if (err) {
     console.error(err)
     response.status(500).json({err:"Erro ao procurar cliente"})
     return
    }
    if (data.length > 0) {
     response.status(400).json({err:"Email já existe"})
    }
   })

   const updateSql = /*sql*/ `UPDATE clientes SET ?? = ? WHERE ?? = ?`;
   const updateSqlData = [ "nome", nome, "email", email ]

   conn.query(updateSql, updateSqlData, (err, info) => {
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
 const { id, email} = request.params;

 const deleletSql = /*sql*/ `DELETE FROM clientes WHERE ?? = ?? AND ?? = ?`;
 const checkDeleteData = [ "cliente_id", id, "email", email]

 conn.query(deleletSql, checkDeleteData, (err, info) => {
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

export const loginCliente = (request, response)=>{
 if (request.body.email && request.body.nome) {
  let email = request.body.email
  let nome = request.body.nome
  const check = /*sql*/`SELECT cliente_id, nome, email FROM clientes WHERE email = ? AND nome = ?`
  const dataSelect = [email, nome]

  conn.query(checkSql, dataSelect, (err, results)=>{
   if (err) {
    console.log(err)
    response.status(500).json({message:" Erro ao bsucar dados"})
    return
   }
   if (results.length > 0) {
    const user = results[0]

    const token = JWT.sign(
     {id: user.cliente_id, email: user.email},
     process.env.JWT_SECRET_KEY,
     {expireIn: '10'}
    )

    response.status(200).json({id: user.cliente_id, email: user.email, token})
   }else{
    response.status(404).json({message: "Usuário náo encontrado"})
   }
  })
 }else{
  response.status(400).json({message: "Email e nome são obrigatórios"})
 }
}
