//A SUPPRIMER APRES AVOIR FAIT LES TEST


const express = require('express');
const rooter = express.Router();

rooter.get('/',(req,res,next) => {
    
    res.status(200).json({
        
        message : 'Handling Get requests to / products'
        
    });
      
});



rooter.post('/',(req,res,next) => {
    const product = {
        name : req.body.name,
        price : req.body.price
    };
    res.status(201).json({
        
        message : 'Handling Post requests to / products',
        createdProduct : product
        
    });
    
});

rooter.get('/:productId',(req,res,next) => {

    const id = req.params.productId;

    if(id === 'special'){

        res.status(200).json({
        
            message : 'You discover a special ID',
            id : id
            
        });


} else{
    
    res.status(200).json({
        
        message : 'You passed an id'
        
    });

}


});


rooter.patch('/:productId',(req,res,next) => {

    res.status(200).json({
        
        message : 'Updated product'
        
    });


});

rooter.delete('/:productId',(req,res,next) => {

    res.status(200).json({
        
        message : 'Delete product'
        
    });


});



module.exports = rooter;