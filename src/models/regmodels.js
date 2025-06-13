let conn=require("../config/db.js");
  
exports.saveUser=(...regdata)=>{
  
    conn.query("insert into users values('0',?,?,?,?,?,?)",[...regdata],(err,result)=>{
      

    });
    return true;
};
exports.savebook=(...regdata)=>{
    
    
    conn.query("insert into books values('0',?,?,?,?,?,?,?,?,?)",[...regdata],(err,result)=>{
        if(err)
        {
            return false;
        }
        else
        {
            return true;
        }
    });
    
}

exports.validateuser=(...logdata)=>{
    let promise=new Promise((resolve,rejuct)=>{
         conn.query("select * from users where uname=? and password=?;",[...logdata],(err,result)=>{
        if(err)
        {
            rejuct(err);
        }
        else{
            resolve(result);
        }
        
    });
    });
   
    return promise;
};
exports.validateuserlogin=(...logdata)=>{
    let promise=new Promise((resolve,rejuct)=>{
         conn.query("select * from members where name=? and password=?;",[...logdata],(err,result)=>{
        if(err)
        {
            rejuct(err);
        }
        else{
            resolve(result);
        }
        
    });
    });
   
    return promise;
};
exports.showbooks = () => 
    new Promise((resolve, reject) => {
        conn.query("SELECT * FROM books;", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
exports.saveMember=(...regdata)=>{
    
    conn.query("insert into members values('0',?,?,?,?,?,?)",[...regdata],(err,result)=>{
      

    });
    return true;
};
exports.showmembers = () => 
    new Promise((resolve, reject) => {
        conn.query("SELECT * FROM members;", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

exports.showprofile = (couid) => 
    new Promise((resolve, reject) => {
        conn.query("SELECT * FROM users where uid=?;",[couid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        
        });
    });
    