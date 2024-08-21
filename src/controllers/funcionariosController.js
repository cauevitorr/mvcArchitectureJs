import conn from "../config/conn.js"
import {v4 as uuidv4} from "uuid"

export const getFuncionarios = (request, response) => {
 const sql = /*sql*/ `SELECT * FROM funcionarios`;
 conn.query(sql, (err, data) => {
  if (err) {
   console.error(err);
   response.status(500).json({ err: "Erro so buscar funcionário" });
   return;
  }
  const funcionarios = data;
  response.status(200).json(funcionarios);
 });
};

export const postFuncionarios = (request, response) => {
 const { nome, cargo, email, salario, data_contratacao } = request.body;

 //validações
 if (!nome) {
  response.status(400).json({ err: "o nome é obrgatório" });
 }
 if (!cargo) {
  response.status(400).json({ err: "o cargo é obrgatório" });
 }
 if (!email) {
  response
   .status(400).json({ err: "o email é obrgatório" });
 }
 if (!salario) {
  response.status(400).json({ err: "o salário é obrgatório" });
 }
 if (!data_contratacao) {
  response.status(400).json({ err: "a data de contrataçao é obrgatório" });
  return;
 }

 //verificar se o funcionário não foi cadastrado
 const checkSql = /*sql*/ `SELECT * FROM funcionarios where email = "${email}"`;
 conn.query(checkSql, (err, data) => {
  if (err) {
   console.log(err);
   response.status(500).json({ err: "Erro ao buscar funcionário" });
   return;
  }
  if (data.length > 0) {
   response.status(409).json({ err: "email já foi cadastrado" });
   return;
  }

  //cadastrar o funcionário
  const id = uuidv4();
  const insertSql = /*sql*/ ` INSERT INTO funcionarios(id_funcionario, nome, cargo, email, salario, data_contratacao) VALUES("${id}", "${nome}", "${cargo}", "${email}", "${salario}", "${data_contratacao}")`;

  conn.query(insertSql, (err) => {
   if (err) {
    console.error(err);
    response.status(500).json({ err: "Erro ao cadastrar o funcionário" });
    return;
   }
   response.status(201).json({ message: "funcionário cadastrado" });
  });
 });
};

export const getFuncionariosId = (request, response) => {
 const { id } = request.params;
 const sql = /*sql*/ `SELECT * FROM funcionarios WHERE id_funcionario = "${id}"`;
 conn.query(sql, (err, data) => {
  if (err) {
   console.error(err);
   response.status(500).json({ err: "Erro ao buscar funcionário" });
   return;
  }
  if (data.length === 0) {
   response.status(404).json({ err: "funcionário não encontrado" });
   return;
  }
  const funcionario = data[0];
  response.status(200).json(funcionario);
 });
};

export const putFuncionarios = (request, response) => {
 const { id } = request.params;
 const { nome, cargo, email, salario, data_contratacao } = request.body;

 if (!nome) {
  response.status(400).json({ err: "O nome é obrigatório" });
  return;
 }
 if (!cargo) {
  response.status(400).json({ err: "O cargo é obrigatório" });
  return;
 }
 if (!email) {
  response.status(400).json({ err: "O email é obrigatório" });
  return;
 }
 if (!salario) {
  response.status(400).json({ err: "O salario é obrigatório" });
  return;
 }
 if (!data_contratacao) {
  response.status(400).json({ err: "A data de contratação é obrigatório" });
  return;
 }

  const sql = /*sql*/ ` SELECT * FROM funcionarios WHERE id_funcionario = "${id}"`;
  conn.query(sql, (err, data) => {
   if (err) {
    console.error(err);
    response.status(500).json({ err: "Erro ao buscar o funcionário" });
    return;
   }

   if (data.length === 0) {
    response.status(404).json({ err: "funcionário não encontrado" });
   }

   // Se o email está disponivel
   const checkEmailSql = /*sql*/`SELECT * FROM funcionarios WHERE email = "${email}" AND id_funcionario != "${id}"`
   conn.query(checkEmailSql, (err, data)=>{
    if (err) {
     console.error(err)
     response.status(500).json({err:"Erro ao procurar funcionario"})
     return
    }
    if (data.length > 0) {
     response.status(409).json({err:"Email já existe"})
    }
   })

   const updateSql = /*sql*/ `UPDATE funcionarios SET 
    nome = "${nome}", cargo = "${cargo}", email = "${email}",
    salario = "${salario}", data_contratacao = "${data_contratacao}" WHERE id_funcionario = "${id}"`;

   conn.query(updateSql, (err, info) => {
    if (err) {
     console.error(err);
     response.status(500).json({ err: "Erro ao atualizar o funcionário" });
     return;
    }
    console.log(info);
    response.status(200).json({ message: "funcionário atualizado" });
   });
  });
};

export const deleteFuncionarios = (request, response) => {
 const { id } = request.params;

 const deleletSql = /*sql*/ `DELETE FROM funcionarios WHERE id_funcionario = "${id}"`;

 conn.query(deleletSql, (err, info) => {
  if (err) {
   console.error(err);
   response.status(500).json({ err: "Erro ao deletar funcionário" });
   return;
  }

  if (info.affectedRows === 0) {
   response.status(200).json({ mesage: "funcionário deletado" });
  }
 });
};
