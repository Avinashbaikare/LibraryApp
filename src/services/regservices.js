let regmodule=require("../models/regmodels");
class RegServices{
    acceptRegdata(name,email,password,phone,address,date){
        let index=email.indexOf("@gmail.com");
        if(index!=-1)
        {
            let result=regmodule.saveUser(name,email,password,phone,address,date);
            return result? "registration Success":"registration Faild";

        }
        else{
           return "registration faild";
        }
    }

    acceptbook(btitle,bauthor,bpublisher,isbn,bcatagory,btotalcopies,bavailablecopies,bstatus,date){
        let index=isbn.length;
        if(index==10)
        {
            let result=regmodule.savebook(btitle,bauthor,bpublisher,isbn,bcatagory,btotalcopies,bavailablecopies,bstatus,date);
            return result? "book is added":"book not added";
        }
        else{
            return "book not added";
        }
    }
        acceptUserregdata(name,email,phone,address,password,date){
        let index=email.indexOf("@gmail.com");
        
        if(index!=-1)
        {
            let result=regmodule.saveMember(name,email,phone,address,password,date);
            return result? "registration Success":"registration Faild";

        }
        else{
           return "registration faild";
        }
    }
}
module.exports=new RegServices();