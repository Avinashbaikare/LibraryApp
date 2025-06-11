let regmodule=require("../models/regmodels");
class RegServices{
    acceptRegdata(name,email,password,role,date){
        let index=email.indexOf("@gmail.com");
        if(index!=-1)
        {
            let result=regmodule.saveUser(name,email,password,role,date);
            return result? "registration Success":"registration Faild";

        }
        else{
           return "registration faild";
        }
    }
}
module.exports=new RegServices();