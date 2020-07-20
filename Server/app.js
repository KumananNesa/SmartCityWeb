const express = require('express');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
app.use('/products', productRoutes); // pas besoin de preciser
app.use('/orders', orderRoutes);
module.exports = app;




/*app.use((req,res,next)=> {

        res.status(200).json({
            
            message : 'OKOKOK THAT OKKK FOR 8080 !'
            
            
        });


});*/


