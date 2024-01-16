const express = require('express');
const uuid = require('uuid');
const app = express();
const port = 3000;
const users = [
  {"username": "sotosp2", "password": "s@tos123"},
  {"username": "fanispap7", "password": "fan1s@"}
];

const path = require('path');
// Προσθήκη middleware για τη διαχείριση δεδομένων JSON
app.use(express.json());


// Ορισμός των φακέλων που περιέχουν στατικά αρχεία
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'routes')));


// Παράδειγμα χρήσης του uuid για τη δημιουργία μοναδικού κωδικού
const uniqueCode = uuid.v4();

// Ορισμός διαδρομής για την αρχική σελίδα
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ορισμός διαδρομής για τη σελίδα κατηγορίας
app.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  res.sendFile(path.join(__dirname, 'views', 'category.html'));
});
// Ορισμός διαδρομής για τη σελίδα favorite-ads.html
app.get('/category/favorite-ads.html/:username/:sessionId', (req, res)=> {
  const username = req.params.username;
  const sessionId = req.params.sessionId;

  res.sendFile(path.join(__dirname, 'views', 'favorite-ads.html'));
});

// Ορισμός διαδρομής για τη σελίδα υποκατηγορίας
app.get('/category/subcategory/:subcategoryId', (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  res.sendFile(path.join(__dirname, 'views', 'subcategory.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username)

  // Υλοποίηση έλεγχου ταυτοποίησης
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Επιτυχής ταυτοποίηση
    const sessionId = uuid.v4();
    // Επιτυχής σύνδεση
  
  res.json({sessionId,success: true});

  } else {
    // Αποτυχία ταυτοποίησης
    res.status(401).json({ error: 'Invalid username or password' });
   
   
}});

// Έναρξη του server
app.listen(port, () => {
  console.log(`Ο server τρέχει στο http://localhost:${port}`);
});
