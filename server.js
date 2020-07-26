const express = require('express');
const mongodb = require('mongodb');
const uri = 'mongodb+srv://CYF_M:5236997@cyf-erwin-first.n8ffs.mongodb.net/<dbname>?retryWrites=true&w=majority';
const mongoOptions = { useUnifiedTopology: true };
const client = new mongodb.MongoClient(uri, mongoOptions);

const app = express();
app.use(express.json());

client.connect(function () {
  const db = client.db('mongo-week3');
  const collection = db.collection('movies')

  app.get('/films', function (request, response) {
      const searchObject = {}
      collection.find(searchObject).toArray(function(error, result) {
        if(error){
          response.status(500).send(error);
            }else if (result) {
              response.status(200).send(result);
            } else {
              response.sendStatus(404)
            }
        // client.close()
    
    });
    // response.send(request.result);
    // response.send('Retrieve all the films');
  });

  app.get('/films/:id', function (request, response) {

    if (!mongodb.ObjectID.isValid(request.params.id)){
      response.status(404).send("The Id is not Valid!");
    }else{
      const searchObject = { "_id" : new mongodb.ObjectID(request.params.id) };
      console.log(searchObject);
      
      collection.find(searchObject).toArray(function(error, result) {
        if(error){
          response.status(500).send(error);
        }else if (result) {
          response.status(200).send(result);
        } else {
          response.sendStatus(404)
        }
      });
    }
  });
  app.post('/films', function (request, response) {
    response.send('Create a film');
  });

  app.put('/films/:id', function (request, response) {
    response.send('Update one film');
  });

  app.delete('/films/:id', function (request, response) {
    response.send('Delete one film');
  });

  // app.listen(3000);
  const port = 3000;
  app.listen(port || 3000, function() {
    console.log(`Running at Port 3000`)
  })
});
