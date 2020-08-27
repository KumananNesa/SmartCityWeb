process.env.NODE_ENV = 'test';

var assert = require( 'assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Server/server');
var should = chai.should();




chai.use(chaiHttp);

// Testing ini test
describe ('test de text', function(){


    it('should do something', function(){
        
        var a = 3;

        assert.equal( a * 2, 6,'la multiplication n \'a pas fonctionner' )
        
    })


})


/*
  * Test the /GET route
  */


describe('/GET sensor', () => {
    it('it should GET all the sensor', (done) => {
          chai.request(server)
          .get('/sensors')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                
            //    res.body.length.should.be.eql(4);
            done();
          });
    });
});  

/*
  * Test the /POST route
  */
 describe('/POST sensor', () => {
    it('it should  POST a sensor', (done) => {
        // exemple to post
        var sensor = {
            
            "sensortype" : "input",
            "numberofvehicle" : 12,
            "idbollard" : 14
        }
          chai.request(server)
          .post('/sensors')
          .send(sensor)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('sensortype');
                res.body.should.have.property('numberofvehicle');
                res.body.should.have.property('idbollard');
                
                //res.body.errors.should.have.property('pages');
                //res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});


 /*
  * Test the /GET/:id route
  */

describe('/GET/:id sensor', () => {
    it('it should GET a sensor by the given id', (done) => {
          chai.request(server)
          .get('/sensors/4') // exemple
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('sensortype');
                res.body.should.have.property('numberofvehicle');
                res.body.should.have.property('idbollard');
              
                
            
            done();
          });
    });
}); 



describe('/GET/:id ERROR ID NOT EXIST', () => {
  it('it should give a message  : Not found Sensor with id', (done) => {
        chai.request(server)
        .get('/sensors/25') // exemple
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Not found Sensor with id 25.');
            
              
          
          done();
        });
  });
}); 


describe('/POST ERROR', () => {
  it('it should  give a message : ER_BAD_NULL_ERROR: Le champ \'sensortype\' ne peut être vide (null)', (done) => {
      // exemple to post
      var sensor = {
          
 
      }
        chai.request(server)
        .post('/sensors')
        .send(sensor)
        .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('ER_BAD_NULL_ERROR: Le champ \'sensortype\' ne peut être vide (null)');
              
              //res.body.errors.should.have.property('pages');
              //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });

});



describe('/POST ERROR', () => {
  it('it should  give a message : ER_BAD_NULL_ERROR: Le champ \'numberofvehicle\' ne peut être vide (null)', (done) => {
      // exemple to post
      var sensor = {
        "sensortype" : "input"
 
      }
        chai.request(server)
        .post('/sensors')
        .send(sensor)
        .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('ER_BAD_NULL_ERROR: Le champ \'numberofvehicle\' ne peut être vide (null)');
              
              //res.body.errors.should.have.property('pages');
              //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });

});



describe('/PUT/:ERROR NOT FOUND', () => {
    it('it should give a message : Not found', (done) => {
        
        var sensor = {
          "sensortype" : "input",
          "numberofvehicle" : 12,
          "idbollard" : 14
        }
        
        chai.request(server)
          .put('/sensors') // exemple
          .send(sensor)
          .end((err, res) => {
            res.should.have.status(404);
         res.body.should.be.a('object');
       //  res.body.should.have.property('message').eql('Not found');
       res.body.error.should.have.property('message').eql('Not found');
              
                
            
            done();
          });
    });
}); 


describe('/PUT/:id ERROR ', () => {
  it('it should give a message : Not found sensor with id 1.', (done) => {
      
      var sensor = {
        "sensortype" : "input",
        "numberofvehicle" : 12,
        "idbollard" : 14
      }
      
      chai.request(server)
        .put('/sensors/25') // exemple
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(404);
       res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Not found Sensors with id 25.');
    // res.body.error.should.have.property('message').eql('Not found');
            
              
          
          done();
        });
  });
}); 


describe('/PUT/:id ERROR', () => {
  it('it should UPDATE a sensor by the given id', (done) => {
      
      var sensor = {
        "sensortype" : "output",
        "numberofvehicle" : 12,
        "idbollard" : 18
      }
      
      chai.request(server)
        .put('/sensors/2s') // exemple
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(200);
       res.body.should.be.a('object');
       res.body.should.have.property('sensortype').eql('output');

            
              
          
          done();
        });
  });
}); 

describe('/DELETE/:id sensor', () => {
    it('it should DELETE a sensor by the given id', (done) => {
          chai.request(server)
          .delete('/sensors/14') // exemple 
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Sensor was deleted successfully!');
            done();
          });
    });
}); 