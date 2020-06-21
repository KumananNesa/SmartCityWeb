<?php
    $host = 'localhost';
    $dbname = 'SmartCityWeb';
    $username = 'postgres';
    $password = 'a';
 
  $dsn = "pgsql:host=$host;port=5432;dbname=$dbname;user=$username;password=$password";
   
  try{
     $conn = new PDO($dsn);
     
     if($conn){
      echo "Connecté à $dbname avec succès!";
     }
  }catch (PDOException $e){
     echo $e->getMessage();
  }
?>