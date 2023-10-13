const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Sample data from fakeUsers.json (assuming it's an array of user objects)
const userData = require('./data/fakeUsers.json');

// Utility function to check authentication
function authenticate(username, password) {
    return userData.find((user) => user.email === username && user.password === password);
}

// Set up middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'views');
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

// Authentication page route
app.get('/login', (req, res) => {
    res.render('login'); // Create an HTML login form
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = authenticate(username, password);

    if (user) {
        res.redirect(`/list`);
    } else {
        res.redirect('/login'); // Redirect back to login page on failed login
    }
});



// Paginate the data
const itemsPerPage = 25;

app.get('/list', (req, res) => {
    const page = req.query.page || 1; // Get the current page from the query string
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, userData.length);

    // Slice the data to display the current page
    const currentPageData = userData.slice(startIndex, endIndex);

    res.render('list', { users: currentPageData });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = userData.find(u => u.id == userId);

    if (user) {
        res.render('detail', { user });
    } else {
        res.status(404).send('User not found');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
