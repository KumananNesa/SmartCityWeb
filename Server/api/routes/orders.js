//A SUPPRIMER APRES AVOIR FAIT LES TEST


const express = require('express');
const rooter = express.Router();

var db = require('../model/db')
//TEST A REFAIRE DANS UN AUTRE FICHIER


///////////////////////////////////////////////////////////////


///////////////////////////////////

rooter.get('/', (req, res, next) => {


 db.query('SELECT * FROM customers ', (err, user, field) => {
        if (err) throw err;
        
        res.status(200).send(user);
        

    
 

})



});


rooter.post('/', (req, res, next) => {

    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };

    res.status(201).json({

        message: 'Order was created',
        order: order

    });

});


rooter.get('/:orderId', (req, res, next) => {

    res.status(200).json({

        message: 'Order details',
        orderID: req.params.orderId

    });

});


rooter.delete('/:orderId', (req, res, next) => {

    res.status(200).json({

        message: 'Order deleted',
        orderID: req.params.orderId

    });

});



module.exports = rooter;