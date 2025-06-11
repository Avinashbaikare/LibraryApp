let mysql=require("mysql2");
let conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Avinash@2001',
    database:'LibraryApp'
});

conn.connect((err)=>{
    if(err)
    {
        console.log("database is not connected",err.message);
    }
    else
    {
        console.log("database is connected....");
    }
})
module.exports=conn;