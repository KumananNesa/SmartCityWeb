function dbconnect(){

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'smartcityweb'
});
 
connection.connect();


return connection;

}


//insertUser();

function insertUser (){
// POST (A faire en post)
    var email = "email@exemple.com"
    var mdp ="123"
    var pseudo ="leo"

    var db = dbconnect();
    var data =  [pseudo,email,mdp];

    db.query('INSERT INTO user SET pseudo=?, email=?, mdp=?',data,(err,user,field)=> {
        if(err) throw err


    })


}

//getuser();

function getuser (){

    var db = dbconnect();

    var data =  ['leo',"email@exemple.com" ];

    db.query('SELECT * FROM USER '/*WHERE pseudo = ? and email =?',data*/,(err,user,field)=> {     
        if(err) throw err;
        console.log(user);


    })

}

//updateUser()
function updateUser(){

    var db = dbconnect();

    var data =  ['999',3];

    db.query('UPDATE user SET mdp=? WHERE id = ?',data,(err,user,field)=> {     
        if(err) throw err;
       // console.log(user);


    })

}

//deleteUser();


function deleteUser (){

    var db = dbconnect();
    var data = [1]

    db.query('DELETE FROM USER WHERE id =?',data,(err,result ,field)=> {     
        if(err) throw err;
        


    })

}
