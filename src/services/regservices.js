let regmodule=require("../models/regmodels");
class RegServices{
   async acceptRegdata(name, email, password, phone, address,adminkey, date) {
   name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    phone = phone?.trim();
    adminkey=adminkey?.trim();
    address = address?.trim();

    
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!name || !nameRegex.test(name)) return "Name must be at least 3 characters and contain only letters and spaces.";

   const strictEmailRegex = /^[a-zA-Z0-9]+([._+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!email || !strictEmailRegex.test(email)) return "Invalid email format.";

     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !strongPasswordRegex.test(password.trim())) {
            return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) return "Phone must be 10 digits starting with 6-9";

    if (!address || address.length < 5) return "Address must be at least 5 characters.";
    if (adminkey !== "Avi@2001") return "Invalid Admin Key.";

    if (!date || isNaN(new Date(date).getTime())) return "Invalid date.";

    
    const result = await regmodule.saveUser(name, email, password, phone, address, date);
    return result ? "Registration Success" : "Registration Failed";
    }
    acceptbook(btitle,bauthor,bpublisher,isbn,bcatagory,btotalcopies,bavailablecopies,bstatus,bimage,blink,date){
        let index=isbn.length;
        if(index==10)
        {
            let result=regmodule.savebook(btitle,bauthor,bpublisher,isbn,bcatagory,btotalcopies,bavailablecopies,bstatus,bimage,blink,date);
            return result? "book is added":"book not added";
        }
        else{
            return "book not added";
        }
    }
    async acceptUserregdata(name,email,phone,address,gender,dob,collegename,password,date){
         name = name?.trim();
        email = email?.trim();
        phone = phone?.trim();
        address = address?.trim();
        gender = gender?.trim();
        dob = dob?.trim();
        collegename = collegename?.trim();
        password = password?.trim();

     
        const nameRegex = /^[A-Za-z\s]{3,}$/;
        const strictEmailRegex = /^[a-zA-Z0-9]+([._+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const collegeNameRegex = /^[A-Za-z0-9](?:[A-Za-z0-9&\.\-'\s]{4,}[A-Za-z0-9])$/;

        
        if (!name || !nameRegex.test(name)) return "Name must be at least 3 characters and contain only letters and spaces.";
        if (!email || !strictEmailRegex.test(email)) return "Invalid email format";
        if (!phone || !phoneRegex.test(phone)) return "Phone must be 10 digits starting with 6-9";
        if (!address || address.length < 5) return "Address must be at least 5 characters";
        if (!["Male", "Female","male", "female","Other"].includes(gender)) return "Invalid gender, gender can be male ,female or other";
        if (!dob || isNaN(Date.parse(dob))) return "Invalid date of birth";
        
        const inputDate = new Date(dob);
        const today = new Date();

        
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (inputDate >= today) {
            return "DOB cannot be today or in the future.";
        }

        if (!collegename || !collegeNameRegex.test(collegename.trim())) return "Invalid college name. Use 6+ letters or digits;";
       
        if (!password || !strongPasswordRegex.test(password.trim())) {
            return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        }
        
        const result = await regmodule.saveMember(name, email, phone, address, gender, dob, collegename, password, date);
        return result ? "Registration Success" : "Registration Failed";
    }
}
module.exports=new RegServices();