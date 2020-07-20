
const express = require('express');
const rooter = express.Router();

rooter.get('/',(req,res,next) => {
    
    console.log('here');
    res.status(200).json({
        
        message : 'Handling Get requests to / products'
        
    });
      
});



rooter.post('/',(req,res,next) => {
    
    res.status(200).json({
        
        message : 'Handling Post requests to / products'
        
    });
    
});

rooter.get('/:productId')

module.exports = rooter;