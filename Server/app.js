const express = require('express');

const app = express();

const productRoutes = require('./api/routes/products');

app.use('/products', productRoutes); // pas besoin de preciser

module.exports = app;




/*app.use((req,res,next)=> {

        res.status(200).json({
            
            message : 'OKOKOK THAT OKKK FOR 8080 !'
            
            
        });


});*/


