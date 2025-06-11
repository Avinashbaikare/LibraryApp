let conn=require("../config/db.js");
  
exports.saveUser=(...regdata)=>{
  
    conn.query("insert into users values('0',?,?,?,?,?)",[...regdata],(err,result)=>{
      

    });
    return true;
};

exports.validateuser=(...logdata)=>{
    let promise=new Promise((resolve,rejuct)=>{
         conn.query("select * from users where uname=? and password=? and role='admin'",[...logdata],(err,result)=>{
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
         conn.query("select * from users where uname=? and password=? and role='user'",[...logdata],(err,result)=>{
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