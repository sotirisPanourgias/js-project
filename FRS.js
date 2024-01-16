const express = require('express');
const cors = require('cors');
const app = express();
const port = 3500;

app.use(cors());
app.use(express.json());


app.post('/getFavorites', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { username, sessionId } = req.body;
  console.log(username)

  // Κάλεσε τη συνάρτηση για τη λήψη των αγαπημένων αγγελιών από το AFS
  const data = await getFavorites(username, sessionId);

  // Επιστροφή απάντησης σε μορφή JSON
  res.json({ success: true, favoriteAds: data });
});


// Συνάρτηση για τη λήψη των αγαπημένων αγγελιών από το AFS
async function getFavorites(username, sessionId) {
  const afsUrl = 'http://localhost:4000/favorites';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionId}`
    },
    body:JSON.stringify({
      username: username,
      sessionId:sessionId,
      })
  };

  
       const authorizationResult = await checkAuthorization(username, sessionId);
      if (authorizationResult.success1) {
        const response = await fetch(afsUrl, requestOptions);
        return await response.json();
      } else {
          console.log('Δεν εχει εξουσιοδοτηθει ο λογαριασμος');
          return [];
      }

  
}
async function checkAuthorization(username, sessionId) {
  const afsUrl = 'http://localhost:4000/check';
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${username, sessionId}`

    },
    body:JSON.stringify({
      username: username,
      sessionId:sessionId,
      })
  };

  try {
    const response = await fetch(afsUrl, requestOptions);
    const data = await response.json();
    return { success1: data.success1 };
  } catch (error) {
    console.error('Error:', error);
    return { success1: false };
  }
}


app.listen(port, () => {
  console.log(`Ο server τρέχει στο http://localhost:${port}`);
});
