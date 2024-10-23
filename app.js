const express = require('express');
const app = express();

//Middleware to parse JSON
app.use(express.json());

//Basic route to check if the API is working
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

//Set the port for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
