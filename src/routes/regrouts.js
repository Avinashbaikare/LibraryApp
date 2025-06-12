let routes=require("express");
let regCtrl=require("../controllers/regCtrl");
let router=routes.Router();

router.get("/",regCtrl.home);
router.get("/userlogin",regCtrl.signup);
router.get("/adminlogin",regCtrl.login);
router.get("/signupadmin",regCtrl.signadmin);

router.post("/saves",regCtrl.saveuser);
router.post("/logsave",regCtrl.validadmin);
router.post("/userLogin",regCtrl.validuser);
router.get("/addbooks",regCtrl.addbook);
router.get("/viewbooks",regCtrl.viewbook);
router.post("/postbook",regCtrl.postbook);
router.get("/admindashboard",regCtrl.admindashboards);

module.exports=router;