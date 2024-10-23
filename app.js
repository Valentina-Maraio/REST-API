const express = require('express');
const app = express();

//Middleware to parse JSON
app.use(express.json());

//In-memory "database"
let items = [
    {
        id: 1,
        name: "Valentina",
        description: "artist"
    },
    {
        id: 2,
        name: "Peke",
        description: "sleeping cat"
    }
];

//Routes 

//Home route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

//Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

//Get a single item by ID
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('Item not found');
    res.json(item) 
});

//Create a new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

//Update an item by ID
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).send('Item not found');

    item.name = req-body.name;
    item.description = req.body.description;
    res.json(item);
});

//Delete an item by ID
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if(itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});


//Set the port for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
