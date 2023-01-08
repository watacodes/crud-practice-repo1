const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect(process.env.MONGO_STRING, 
  { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    
    const db = client.db('crud-task-tracker');
    const tasksCollection = db.collection('tasks');
    
    app.get('/', (req, res) => {
      db.collection('tasks').find().toArray()
      .then(result => {
        res.render('index.ejs', { tasks: result });
      })
      .catch(error => console.error(error))
    });
  
    app.post('/tasks', (req, res) => {
      tasksCollection.insertOne(req.body)
        .then(res => {
          console.log(res);
        })
        .catch(error => console.error(error));
    });

    app.put('/tasks', (req, res) => {
      console.log(req.body);
      
    });
  
    app.listen(PORT, () => {
      console.log('server running on ', PORT);
    });
  })
  .catch(error => console.error(error));




