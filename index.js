const express = require('express');
const bodyParser = require("body-parser");

// const password = "8nzy#u4Uby75XdQ";
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:user12345@cluster0.skqkk.mongodb.net/organicProducts?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
    const collection = client.db("organicProducts").collection("products");

    // get data from server to ui
    app.get('/products',(req, res) =>{
        collection.find({})
        .toArray ((err, documents) =>{
            res.send(documents);
        })
    })

    // post from ui

    app.post("/addProducts", (req, res) => {
       const product = req.body;
       collection.insertOne(product)
       .then(result =>{
           console.log("data added successfully");
           res.send('successfully added user!');
       })
    })
});


app.listen(3000);