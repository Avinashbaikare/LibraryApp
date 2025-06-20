let conn=require("../config/db.js");
  
exports.saveUser=(...regdata)=>{
  
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO users VALUES ('0',?,?,?,?,?,?)", [...regdata], (err, result) => {
            if (err) {
                console.error("Insert Error:", err);
                resolve(false); 
            } else {
                resolve(true);
            }
        });
    });
};
exports.savebook=(...regdata)=>{
    
    console.log(regdata);
    conn.query("insert into books values('0',?,?,?,?,?,?,?,?,?,?,?)",[...regdata],(err,result)=>{
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
         conn.query("select * from users where uemail=? and password=?;",[...logdata],(err,result)=>{
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
         conn.query("select * from members where email=? and password=?;",[...logdata],(err,result)=>{
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
   return new Promise((resolve, reject) => {
        conn.query("INSERT INTO members VALUES ('0', ?, ?, ?, ?, ?, ?, ?, ?, ?)", [...regdata], (err, result) => {
            if (err) {
                console.error("DB Error:", err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};
exports.showmembers = () => 
    new Promise((resolve, reject) => {
        conn.query("SELECT * FROM members;", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
exports.showbookcount = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT COUNT(*) AS count FROM books", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
exports.showmembercount = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT COUNT(*) AS count FROM members", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.showprofile = (couid) => 
    new Promise((resolve, reject) => {
        conn.query("SELECT * FROM users where uid=?;",[couid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        
        });
    });
    exports.showUserprofile = (userid) => 
    new Promise((resolve, reject) => {
        conn.query("SELECT * FROM members where id=?;",[userid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        
        });
    });
   exports.requestbook = (student_id, book_id) =>
    new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO book_requests (student_id, book_id, request_date, status)
            VALUES (?, ?, NOW(), 'Pending')
        `;

        conn.query(sql, [student_id, book_id], (err, result) => {
            if (err) {
                console.error("Error inserting book request:", err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    exports.showrequests = (student_id) => {
    return new Promise((resolve, reject) => {
        conn.query("select * from book_requests where student_id=?;",[student_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.showissuerequestadmin = () =>{
     return new Promise((resolve, reject) => {
         const sql = `
            SELECT br.request_id, s.name,br.book_id, b.title, br.request_date, br.status
FROM book_requests br
JOIN members s ON br.student_id = s.id
JOIN books b ON br.book_id = b.id;
        `;
        conn.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

exports.acceptrequest = (couid) => 
    new Promise((resolve, reject) => {
        conn.query("UPDATE book_requests SET status = 'Approved' WHERE request_id = ?;",[couid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        
        });
    });

exports.rejectrequest = (couid) =>
    new Promise((resolve,reject) => {
        conn.query("UPDATE book_requests SET status = 'Rejected' WHERE request_id = ?;",[couid],(err,result) =>{
            if(err) reject(err);
            else resolve(result);
        })
    });
   exports.updatebook = (couid) => 
     new Promise((resolve, reject) => {
        conn.query("SELECT * FROM books where id=?;",[couid], (err, result) => { 
              if (err) reject(err);
            else resolve(result);
        });
     });  
exports.saveupdatebook = (bookid,title,author,publisher,isbn,category,totalcopies,avilablecopies,status) => 
    new Promise((resolve, reject) => {
        conn.query("update books set title=?,author=?,publisher=?,isbn=?,category=?,total_copies=?,available_copies=?,status=? where id=?;",[title,author,publisher,isbn,category,totalcopies,avilablecopies,status,bookid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        
        });
    }); 
exports.showborrowbooks = (couid) =>
new Promise((resolve, reject) => {
    const sql = `SELECT 
    br.request_id,
    br.student_id,
    br.book_id,
    br.request_date,
    b.title,
    b.author,
    b.publisher,
    b.isbn,
    b.category,
    b.image,
    b.link
FROM 
    book_requests br
JOIN 
    books b
ON 
    br.book_id = b.id
WHERE 
    br.status = 'Approved'
    AND br.student_id = ?;               
        `;
        conn.query(sql,[couid], (err, result) => { 
              if (err) reject(err);
            else resolve(result);
        });
     });  
exports.totalrequest = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT COUNT(*) AS count FROM book_requests where student_id=?",[id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
exports.approvedrequest = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT COUNT(*) AS count FROM book_requests where student_id=? and status='Approved' ",[id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
exports.deletebook = (bid) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM books WHERE id = ?", [bid], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
exports.removemember=(uid)=>{
  return new Promise((resolve,reject)=>{
    conn.query("delete from members where id=?",[uid],(err,result)=>{
     if (err) reject(err);
      else resolve(result);
    });
  });
};
exports.deleteissudata = (bid) => {
  return new Promise((resolve, reject) => {
    conn.query("delete from book_requests where book_id=?",[bid],(err,result)=>{
        if (err) reject(err);
      else resolve(result);
    });
  });
};

 exports.returnbook = (student_id, book_id) =>
    new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO book_requests (student_id, book_id, request_date, status)
            VALUES (?, ?, NOW(), 'Returned')
        `;

        conn.query(sql, [student_id, book_id], (err, result) => {
            if (err) {
                console.error("Error inserting book request:", err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    exports.returnbookrequest = (couid) => 
    new Promise((resolve, reject) => {
        conn.query("UPDATE book_requests SET status = 'Returned' WHERE request_id = ?;",[couid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        
        });
    });