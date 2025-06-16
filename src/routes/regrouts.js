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
router.get("/studviewbook",regCtrl.studviewbook);
router.get("/issubook",regCtrl.issubooks);
router.get("/regemember",regCtrl.Regmembers);
router.post("/savemember",regCtrl.savemembers);
router.get("/viewmembers",regCtrl.viewmembers);
router.get("/adminprofile",regCtrl.adminprofile);
router.get("/userprofile",regCtrl.userprofile)


module.exports=router;