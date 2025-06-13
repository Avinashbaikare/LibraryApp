let regservice=require("../services/regservices.js");
let regmodels=require("../models/regmodels.js");
exports.home=(req,res)=>{
    res.render("home.ejs");
}
exports.signup=(req,res)=>{
    res.render("loginuser.ejs",{msg:""});
}
exports.login=(req,res)=>{
    res.render("loginadmin.ejs",{msg:""});
}
exports.signadmin=(req,res)=>{
    res.render("signupstd.ejs",{msg:""});
}
exports.saveuser=(req,res)=>{
    let{name,email,password,phone,address}=req.body;
    let date=new Date();

    let result=regservice.acceptRegdata(name,email,password,phone,address,date);
    res.render("signupstd.ejs",{msg:result});
}
exports.validadmin=(req,res)=>{
    let{username,password}=req.body;

     let result=regmodels.validateuser(username,password);
      result.then((r)=>{
        if(r.length>0)
        {
             res.render("adminboard.ejs",{msg:r[0]});
            
        }
        else{
             res.render("loginadmin.ejs",{msg:"Admin not valid...."});
        }
    });
}
exports.validuser=(req,res)=>{
    let{username,password}=req.body;

     let result=regmodels.validateuserlogin(username,password);
      result.then((r)=>{
        if(r.length>0)
        {
             res.render("userboard.ejs",{msg:r});
            
            
        }
        else{
             res.render("loginuser.ejs",{msg:"User Not Valid...."});
        }
    });
}
exports.addbook=(req,res)=>{
res.render("addBooks.ejs",{msg:""});
}
exports.viewbook = async (req, res) => {
    try {
        let result = await regmodels.showbooks();
        
        res.render("viewbooks.ejs", { data: result });
    } 
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postbook=(req,res)=>{
    let{btitle,bauthor,bpublisher,isbn,bcatagory,btotalcopies,bavailablecopies,bstatus}=req.body;
    let date=new Date();
        
     let result=regservice.acceptbook(btitle,bauthor,bpublisher,isbn,bcatagory,btotalcopies,bavailablecopies,bstatus,date);
      res.render("addBooks.ejs",{msg:result});
      
}
exports.admindashboards=(req,res)=>{
    res.render("adminboard.ejs");
}
exports.studviewbook = async (req, res) => {
    try {
        let result = await regmodels.showbooks();
        
        res.render("studviewbooks.ejs", { data: result });
    } 
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.issubooks=(req,res)=>{
    res.render("issuebooks.ejs");
}
exports.Regmembers=(req,res)=>{
    res.render("memberReg.ejs");
}
exports.savemembers=(req,res)=>
{
     let{name,email,phone,address,password}=req.body;
    let date=new Date();

    let result=regservice.acceptUserregdata(name,email,phone,address,password,date);
    res.render("memberReg.ejs",{msg:result});

}
exports.viewmembers = async (req, res) => {
    try {
        let result = await regmodels.showmembers();
        
        res.render("viewmembers.ejs", { data: result });
    } 
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.adminprofile = (req, res) => {
  let couid = parseInt(req.query.uid.trim());

  regmodels.showprofile(couid).then((result) => {
    if (result.length > 0) {
      res.render("adminprofile.ejs", { data: result[0] });
      
    } else {
      res.render("adminprofile.ejs", { data: null, msg: "No user found." });
    }
  }).catch((err) => {
    console.error("Error fetching profile:", err);
    res.status(500).send("Server error");
  });
};
