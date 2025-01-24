const express = require('express');
const path = require('path'); // Required to work with file paths
const app = express();
const port = 3000;
const items = ['Apple', 'Banana', 'Orange'];
// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}); 
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Adjust directory as needed
// Middleware to parse JSON
app.use(express.json());
// GET route for items
app.get('/items', (req, res) => {
    res.json(items);
});
// POST route for adding items
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});