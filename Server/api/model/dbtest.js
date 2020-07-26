//A SUPPRIMER APRES AVOIR FAIT LES TEST

var db = function dbconnect(){

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

    var db1 = db();
    var data =  [pseudo,email,mdp];

    db1.query('INSERT INTO user SET pseudo=?, email=?, mdp=?',data,(err,user,field)=> {
        if(err) throw err


    })


}

getuser();

function getuser (){

    var db1 = db();

    var data =  ['leo',"email@exemple.com" ];

    db1.query('SELECT * FROM USER '/*WHERE pseudo = ? and email =?',data*/,(err,user,field)=> {     
        if(err) throw err;
        console.log(user);


    })

}

//updateUser()
function updateUser(){

    var db1 = db();

    var data =  ['999',3];

    db1.query('UPDATE user SET mdp=? WHERE id = ?',data,(err,user,field)=> {     
        if(err) throw err;
       // console.log(user);


    })

}

//deleteUser();


function deleteUser (){

    var db1 = db();
    var data = [1]

    db1.query('DELETE FROM USER WHERE id =?',data,(err,result ,field)=> {     
        if(err) throw err;
        


    })

}
