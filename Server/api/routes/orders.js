
const express = require('express');
const rooter = express.Router();

rooter.get('/',(req,res,next) => {
    
    res.status(200).json({
        
        message : 'Order were fetched'
        
    });
      
});


rooter.post('/',(req,res,next) => {
    
    res.status(201).json({
        
        message : 'Order was created'
        
    });
      
});


rooter.get('/:orderId',(req,res,next) => {
    
    res.status(200).json({
        
        message : 'Order details',
        orderID : req.params.orderId
        
    });
      
});


rooter.delete('/:orderId',(req,res,next) => {
    
    res.status(200).json({
        
        message : 'Order deleted',
        orderID : req.params.orderId
        
    });
      
});



module.exports = rooter;