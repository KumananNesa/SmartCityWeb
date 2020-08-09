var Percentage = require('../lib/Percentage')
var assert = require( 'assert');

describe ('Percentage', function(){


    describe('#evolution', function(){
        
        it('should give an evolution', function(){
        
            //var a = 3;
    
            assert.equal(Percentage.evolution(100,200),100)
            assert.equal(Percentage.evolution(100,150),50)
            assert.equal(Percentage.evolution(100,50),-50)
            
        })
    })


})  