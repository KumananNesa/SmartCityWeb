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


describe('/GET customer', () => {
    it('it should GET all the custommer', (done) => {
          chai.request(server)
          .get('/customers')
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
 describe('/POST customer', () => {
    it('it should  POST a customer', (done) => {
        // exemple to post
        var customer = {
            
            "email" : "WilAime@prontonmail.com",
            "name" : "Willam",
            "active" : true
        }
          chai.request(server)
          .post('/customers')
          .send(customer/*{
            'email' : 'WilAime@prontonmail.com',
            'name' : 'Willam',
            'active' : true
        }*/)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('name');
                res.body.should.have.property('active');
                
                //res.body.errors.should.have.property('pages');
                //res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});


 /*
  * Test the /GET/:id route
  */

describe('/GET/:id customer', () => {
    it('it should GET a customer by the given id', (done) => {
          chai.request(server)
          .get('/customers/4') // exemple
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email');
                res.body.should.have.property('name');
                res.body.should.have.property('active');
              
                
            
            done();
          });
    });
}); 



describe('/GET/:id ERROR ID NOT EXIST', () => {
  it('it should give a message  : Not found Customer with id', (done) => {
        chai.request(server)
        .get('/customers/25') // exemple
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Not found Customer with id 25.');
            
              
          
          done();
        });
  });
}); 


describe('/POST ERROR', () => {
  it('it should  give a message : ER_BAD_NULL_ERROR: Le champ \'email\' ne peut être vide (null)', (done) => {
      // exemple to post
      var customer = {
          
 
      }
        chai.request(server)
        .post('/customers')
        .send(customer)
        .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('ER_BAD_NULL_ERROR: Le champ \'email\' ne peut être vide (null)');
              
              //res.body.errors.should.have.property('pages');
              //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });

});



describe('/POST ERROR', () => {
  it('it should  give a message : ER_BAD_NULL_ERROR: Le champ \'name\' ne peut être vide (null)', (done) => {
      // exemple to post
      var customer = {
        "email" : "DAMcSIEN@prontonmail.com"
 
      }
        chai.request(server)
        .post('/customers')
        .send(customer)
        .end((err, res) => {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('ER_BAD_NULL_ERROR: Le champ \'name\' ne peut être vide (null)');
              
              //res.body.errors.should.have.property('pages');
              //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
  });

});



describe('/PUT/:ERROR NOT FOUND', () => {
    it('it should give a message : Not found', (done) => {
        
        var customer = {
            "email" : "WilAime@prontonmail.com",
            "name" : "DAMSIEN",
            "active" : true
        }
        
        chai.request(server)
          .put('/customers') // exemple
          .send(customer)
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
  it('it should give a message : Not found Customer with id 1.', (done) => {
      
      var customer = {
          "email" : "WilAime@prontonmail.com",
          "name" : "DAMSIEN",
          "active" : true
      }
      
      chai.request(server)
        .put('/customers/1') // exemple
        .send(customer)
        .end((err, res) => {
          res.should.have.status(404);
       res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Not found Customer with id 1.');
    // res.body.error.should.have.property('message').eql('Not found');
            
              
          
          done();
        });
  });
}); 


describe('/PUT/:id ERROR', () => {
  it('it should UPDATE a customer by the given id', (done) => {
      
      var customer = {
          "email" : "WilAime@prontonmail.com",
          "name" : "DAMSIEN",
          "active" : true
      }
      
      chai.request(server)
        .put('/customers/23') // exemple
        .send(customer)
        .end((err, res) => {
          res.should.have.status(200);
       res.body.should.be.a('object');
       res.body.should.have.property('name').eql('DAMSIEN');

            
              
          
          done();
        });
  });
}); 
/*
describe('/DELETE/:id customer', () => {
    it('it should DELETE a customer by the given id', (done) => {
          chai.request(server)
          .delete('/customers/32') // exemple a changer
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Customer was deleted successfully!');
            done();
          });
    });
}); */