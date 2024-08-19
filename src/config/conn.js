import "dontev/config"
import mysql from "mysql12"

const conn = mysql.createPool({
 connectionLimit: 10,
 host: process.env.MYSQL_HOST,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASSWORD, //Sen@iDev77!.
 database: process.env.MYSQL_DATABASE,
 port: process.env.MYSQL_PORT,
})

conn.connect((err) => {
 if (err) {
   console.log(err);
 }
 console.log("MYSQL conectado!");

 // app.listen(PORT, () => {
 //   console.log("Servidor on PORT " + PORT);
 // });
});

 export default conn
