const mysql=require('mysql2/promise');

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Ranjit47@H',
    database:'employee_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports=db;