let regservice=require("../services/regservices.js");
let regmodels=require("../models/regmodels.js");
exports.home=(req,res)=>{
    res.render("home2.ejs");
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
exports.saveuser=async (req, res) => {
    let { name, email, password, phone, address,adminkey } = req.body;
    let date = new Date();

    try {
        let result = await regservice.acceptRegdata(name, email, password, phone, address,adminkey,date);
        res.render("signupstd.ejs", { msg: result });
    } catch (err) {
        console.error("Error during registration:", err);
        res.render("signupstd.ejs", { msg: "Registration failed due to server error." });
    }
};
exports.validadmin = (req, res) => {
    let { username, password } = req.body;

    let result = regmodels.validateuser(username, password);
    result.then(async (r) => {
        if (r.length > 0) {
            try {
                let data1 = await regmodels.showbookcount();
                let data2 = await regmodels.showmembercount();

                res.render("adminboard.ejs", { msg: r[0], data: data1,data1: data2 });

               
            } catch (err) {
                console.error("Error fetching book count:", err);
                res.status(500).send("Error loading");
            }
        } else {
            res.render("loginadmin.ejs", { msg: "Admin not valid...." });
        }
    });
};

exports.validuser = (req, res) => {
    let { username, password } = req.body;

    regmodels.validateuserlogin(username, password).then(async (r) => {
        if (r.length > 0) {
            let id = r[0].id;
            try {
                
                let data1 = await regmodels.totalrequest(id);
                let data2=await regmodels.approvedrequest(id);
                
                res.render("userboard.ejs", { msg: r[0], data: data1 ,data1: data2 });
            } catch (err) {
                console.error("Error fetching book count:", err);
                res.status(500).send("Error loading user dashboard");
            }
        } else {
            res.render("loginuser.ejs", { msg: "User Not Valid...." });
        }
    }).catch((err) => {
        console.error("Login validation error:", err);
        res.status(500).send("Internal Server Error");
    });
};


exports.addbook= (req, res) => {
  let couid = parseInt(req.query.uid.trim());

  regmodels.showprofile(couid).then((result) => {
    if (result.length > 0) {
        
      res.render("addBooks.ejs", { msg:"",data: result[0] });
      
    } else {
      res.render("addBooks.ejs", { data:null, msg: "No user found." });
    }
  }).catch((err) => {
    console.error("Error fetching profile:", err);
    res.status(500).send("Server error");
  });
};


exports.viewbook = async (req, res) => {
     let couid = parseInt(req.query.uid.trim());
    
    try {
        
        let result = await regmodels.showbooks();
        regmodels.showprofile(couid).then((result1) => {
    if (result1.length > 0) {
      res.render("viewbooks.ejs", { msg:"",data: result,data1: result1[0] });
     
      
    } else {
      res.render("viewbooks.ejs", { data: null,data1:null, msg: "No user found." });
    }
  });
        
       
    } 
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.postbook = (req, res) => {
  let { uid, btitle, bauthor, bpublisher, isbn, bcatagory, btotalcopies, bavailablecopies,bstatus,bimage,blink } = req.body;
  let date = new Date();
    
  let result = regservice.acceptbook(btitle, bauthor, bpublisher, isbn, bcatagory, btotalcopies, bavailablecopies,bstatus,bimage,blink,date);

  let couid = parseInt(uid.trim());

  regmodels.showprofile(couid).then((result) => {
    if (result.length > 0) {
      res.render("addBooks.ejs", { msg: "book is added", data: result[0] });
    } else {
      res.render("addBooks.ejs", { data: null, msg: "No user found." });
    }
  }).catch((err) => {
    console.error("Error fetching profile:", err);
    res.status(500).send("Server error");
  });
};



exports.admindashboards = async (req, res) => {
  try {
    let couid = parseInt(req.query.uid.trim());

    const profile = await regmodels.showprofile(couid);

    if (profile.length > 0) {
    
      const bookCount = await regmodels.showbookcount();
      const membercount = await regmodels.showmembercount();
      
      res.render("adminboard.ejs", { msg: profile[0], data: bookCount,data1: membercount });
    } else {
      res.render("adminboard.ejs", { msg: "No user found.", data: null , data1: null});
    }
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Server error");
  }
};

exports.Regmembers=(req,res)=>{
    res.render("memberReg.ejs",{msg:""});
}
exports.savemembers=async (req, res) => {
    let { name, email, phone, address, gender, dob, collegename, password } = req.body;
    let date = new Date();

    try {
        let result = await regservice.acceptUserregdata(name, email, phone, address, gender, dob, collegename, password, date);
        res.render("memberReg.ejs", { msg: result });
    } catch (err) {
        console.error("Error registering member:", err);
        res.render("memberReg.ejs", { msg: "Registration failed due to server error." });
    }
};
exports.viewmembers = async (req, res) => {
    let couid = parseInt(req.query.uid.trim());
    try {
        let result = await regmodels.showmembers();
         regmodels.showprofile(couid).then((result1) => {
    if (result1.length > 0) {
      res.render("viewmembers.ejs", {msg:"", data: result,data1: result1[0]});
     
      
    } else {
      res.render("viewmembers.ejs", { data: null,data1:null, msg: "No user found." });
    }
  });      
       
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

exports.userprofile = (req, res) => {
  let userid = parseInt(req.query.id.trim());

  regmodels.showUserprofile(userid).then((result) => {
    if (result.length > 0) {
      res.render("userprofile.ejs", { data: result[0] });
      
    } else {
      res.render("userprofile.ejs", { data: null, msg: "No user found." });
    }
  }).catch((err) => {
    console.error("Error fetching profile:", err);
    res.status(500).send("Server error");
  });
};
exports.studviewbook = async (req, res) => {
      let userid = parseInt(req.query.id.trim());
    
    try {
        
        let result = await regmodels.showbooks();
        regmodels.showUserprofile(userid).then((result1) => {
    if (result1.length > 0) {
      res.render("studviewbooks.ejs", { msg:"",data: result,data1: result1[0] });
     
      
    } else {
      res.render("studviewbooks.ejs", { data: null,data1:null, msg: "No user found." });
    }
  });
        
       
    } 
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.issubooks = (req, res) => {
    let userid = parseInt(req.query.id.trim());

    
    Promise.all([
        regmodels.showUserprofile(userid),
        regmodels.showrequests(userid)
    ])
    .then(([userResult, allRequests]) => {
        if (userResult.length > 0) {
            res.render("issuebooks.ejs", {
                msg: "",
                data: userResult[0],      
                requests: allRequests     
            });
        } else {
            res.render("issuebooks.ejs", {
                msg: "No user found.",
                data: null,
                requests: allRequests     
            });
        }
    })
    .catch((err) => {
        console.error("Error fetching profile or requests:", err);
        res.status(500).send("Server error");
    });
};

exports.requestbook = (req, res) => {
    const { student_id, book_id } = req.body;

    regmodels.requestbook(student_id, book_id)
        .then(() => {
            
            return Promise.all([
                regmodels.showrequests(student_id),
                regmodels.showUserprofile(student_id)
            ]);
        })
        .then(([allRequests, userProfile]) => {
        
            res.render("issuebooks.ejs", {
                msg: "Book request submitted successfully.",
                requests: allRequests,
                data: userProfile[0]  
            });
        })
        .catch((err) => {
            console.error("Error inserting book request or fetching data:", err);
            res.status(500).send("Server error");
        });
};

exports.issueboard = async (req, res) => {
    let adminid = parseInt(req.query.uid.trim());  
    
    try {
        let result1 = await regmodels.showprofile(adminid);
        let issueRequests = await regmodels.showissuerequestadmin();  // call your function

        if (result1.length > 0) {
            res.render("issueboardadmin.ejs", {
                data1: result1[0],      
                data: issueRequests   
            });
        } else {
            res.render("issueboardadmin.ejs", {
                data1: null,
                data: null,
                msg: "No user found."
            });
        }
    } catch (err) {
        console.error("Error fetching profile or requests:", err);
        res.status(500).send("Server error");
    }
};

// Approve request
exports.approveRequest = async (req, res) => {
   let{request_id}=req.body; 
   let data1_uid = parseInt(req.query.uid.trim());  
    console.log(data1_uid);
    try {
        await regmodels.acceptrequest(request_id);
        let profileResult = await regmodels.showprofile(data1_uid);
        let requestsResult = await regmodels.showissuerequestadmin();
    
    
        res.render("issueboardadmin.ejs", {
            data1: profileResult[0],
            data: requestsResult
        });
    } catch (err) {
        console.error("Error approving request:", err);
        res.status(500).send("Server error");
    }
};


// Reject request
exports.rejectRequest = async (req, res) => {
   let{request_id}=req.body;  
   let data1_uid = parseInt(req.query.uid.trim());  
    
    try {
        await regmodels.rejectrequest(request_id);
        let profileResult = await regmodels.showprofile(data1_uid);
        let requestsResult = await regmodels.showissuerequestadmin();

        res.render("issueboardadmin.ejs", {
            data1: profileResult[0],
            data: requestsResult
        });
    } catch (err) {
        console.error("Error approving request:", err);
        res.status(500).send("Server error");
    }
};
  exports.userdashboard = async (req, res) => {
  try {
    let userid = parseInt(req.query.id.trim());

    const profile = await regmodels.showUserprofile(userid);

    if (profile.length > 0) {
      const requestcount = await regmodels.totalrequest(userid);
      const approvedcount= await regmodels.approvedrequest(userid);
      
      res.render("userboard.ejs", { msg: profile[0],data: requestcount, data1: approvedcount});
    } else {
      res.render("userboard.ejs", { msg: "No user found.", data: null, data1: null});
    }
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Server error");
  }
};
exports.updatebooks=async (req, res) => {
     let couid = parseInt(req.query.uid.trim());
     
     try {  
        let result = await regmodels.showbooks();
        regmodels.updatebook(couid).then((result1) => {
          if (result1.length > 0) {
            res.render("updatebooks.ejs", {data1: result1[0],msg:""});
          }
          else {
             res.render("updatebooks.ejs", {data1:null, msg: "No user found." });
            }
        });
      } 
     catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
     }
 };
exports.saveupdatebook=async (req, res) => {
    
     
     let {bookid,btitle,bauthor,bpublisher,isbn,bcategory,btotalcopies,bavailablecopies,bstatus}=req.body;
     try {  
        
        regmodels.saveupdatebook(bookid,btitle,bauthor,bpublisher,isbn,bcategory,btotalcopies,bavailablecopies,bstatus).then((result1) => {
        
            res.render("updatebooks.ejs", {data1:[],msg:"Book is updated" });
          
          
        });
      } 
     catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }

 };
exports.borrowbooks= async (req, res) => {
      let userid = parseInt(req.query.id.trim());
    
    try {
        
        let result = await regmodels.showborrowbooks(userid);
        regmodels.showUserprofile(userid).then((result1) => {
    if (result1.length > 0) {
      res.render("stdborrowbooks.ejs", { msg:"",data: result,data1: result1[0] });
     
      
    } else {
      res.render("stdborrowbooks.ejs", { data: null,data1:null, msg: "No user found." });
    }
  });
        
       
    } 
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deletebook = async (req, res) => {
  let bid = parseInt(req.query.bid.trim());
  let uid = parseInt(req.query.uid.trim()); 

  try {
    await regmodels.deletebook(bid);
    await regmodels.deleteissudata(bid);
    res.redirect("/viewbooks?uid=" + uid); 
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Failed to delete book.");
  }
};
exports.removemember=async (req,res)=>{
 let uid=parseInt(req.query.uid.trim());
 try{
  await regmodels.removemember(uid);
  res.redirect("/viewmembers?uid="+uid);
 
 }catch(err){
   console.error("Error deleting book:", err);
   res.status(500).send("Failed to remove member");
 }
};