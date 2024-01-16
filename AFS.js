const express = require('express');
const cors=require('cors');
const app = express();
const port = 4000;
const favorites =[];
const users=[]

const path = require('path');
app.use(cors());
// Προσθήκη middleware για τη διαχείριση δεδομένων JSON
app.use(express.json());

app.post('/favorites', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  // Εδώ επιστρέφετε τον πίνακα των αγαπημένων αγγελιών σε μορφή JSON
  res.status(200).json(favorites);
});

app.post('/log',(req,res)=>{
  res.header('Access-Control-Allow-Origin', '*');
  const {username,sessionId}=req.body;
  users.push({username,sessionId});
  console.log(users);
});

app.post('/ADfav', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
  
    const {id,title,description,cost,img_url, username, sessionId } = req.body;
    
    
  
    // Έλεγχος εξουσιοδότησης και διπλοκαταχώρησης
    console.log(users);
    console.log(username,sessionId);
    const isAuthorized = checkAuthorization(username, sessionId);
    const isNotDuplicate = checkDuplicate(id, username);
    console.log(isAuthorized);
    console.log(isNotDuplicate);


    if (isAuthorized && isNotDuplicate) {
      // Προσθήκη στις αγαπημένες αγγελίες
      favorites.push({ id, title, description, cost, img_url, username,sessionId});
      console.log(favorites);

      // Επιστροφή κατάλληλου κωδικού απόκρισης
      res.status(200).json({ success: true, message: 'Η αγγελία προστέθηκε στα αγαπημένα.' });
    } else {
      // Επιστροφή κατάλληλου κωδικού απόκρισης σε περίπτωση σφάλματος
      res.status(403).json({ success: false, message: 'Σφάλμα εξουσιοδότησης ή διπλοκαταχώρησης.' });
    }
});

app.post('/check',(req,res)=>{
      res.header=('Access-Control-Allow-Origin','*');
      const{username,sessionId}=req.body;
      console.log(username)
      console.log(sessionId)
      console.log('dssaasd')
      res.json({success1:checkAuthorization(username,sessionId)})
});

// Έλεγχος διπλοκαταχώρησης
function checkDuplicate(adId, username) {
 // Ελέγχει αν το adId υπάρχει ήδη για τον συγκεκριμένο χρήστη
 console.log(favorites);
  if(favorites.some(fav => fav.id === adId && fav.username === username)){
    return false;
  }else{
    return true;
  };
}

function checkAuthorization(username, sessionId) {
  console.log(username);
  console.log(sessionId)
  console.log(users);
  const user = users.find(user => user.username === username && user.sessionId === sessionId);
  console.log(user);
  return user !== undefined; // Επιστρέφει true αν βρέθηκε χρήστης, δηλαδή το ζεύγος είναι έγκυρο
}






// Έναρξη του server
app.listen(port, () => {
    console.log(`Ο server τρέχει στο http://localhost:${port}`);
  });