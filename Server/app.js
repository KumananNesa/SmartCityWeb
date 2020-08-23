const express = require('express');

const app = express();
const morgan = require('morgan'); //Affiche req sur server
const bodyParser =  require('body-parser'); // parse bidy for post

app.use(morgan('dev'))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse requests of content-type - application/json
app.use(bodyParser.json()); 





//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"//*//
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


  //simple root
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Smartcityweb application." });
  });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//A SUPPRIMER APRES AVOIR FAIT LES TEST
const productRoutes = require('./api/routes/products');// import
const orderRoutes = require('./api/routes/orders');



app.use('/products', productRoutes); // pas besoin de preciser le chelin dans app
app.use('/orders', orderRoutes); //pas besoin de preciser le chelin dans app

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


require("./api/routes/sensor.routes.js")(app);




//Gestion des erreurs  /// A REVOIR
app.use((req,res,next) => {

    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {

    res.status(error.status || 500 );
    res.json({ 

        error : { 
            message: error.message


    }

        });

});
module.exports = app;







