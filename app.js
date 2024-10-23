const express = require('express');
const app = express();

//Middleware to parse JSON
app.use(express.json());
const mongoose = require('mongoose');

//Load environment variables
require('dotenv').config();

//Encode the password from .env file
const encodedPass = encodeURIComponent(process.env.MONGO_PASSWORD);

//Create the MongoDB connection string
const mongoURI = `mongodb+srv://valentina_maraio_admin:${encodedPass}@mycluster.buufz.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const Item = require('./models/Item')

//Routes 

//Home route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

//Get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

//Get a single item by ID
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).send('Item not found');
        res.json(item) 
    } catch (err) {
        res.status(500).send('Server error');
    }
});

//Create a new item
app.post('/api/items', async (req, res) => {
    const { name, description } =req.body;
    try {
        const newItem = new Item({ name, description });
        await newItem.seve()
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).send('Server error')
    }
});

//Update an item by ID
app.put('/api/items/:id', async (req, res) => {
    const { name, description } = req.body;

    try {
        let item = await Item.findById(req.params.id);
        if(!item) return res.status(404).send('Item not found');

        item.name = name;
        item.description = description;
        await item.save();

        res.json(item);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

//Delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).send('Item not found');

        await item.remove();
        res.json({msg: 'Item deleted'});
    } catch (err) {
        res.status(500).send('Server error');
    }
});


//Set the port for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
