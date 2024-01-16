document.addEventListener('DOMContentLoaded', function () {
    // Λήψη των παραμέτρων από το URL
    const pathArray = window.location.pathname.split('/');
    const username = pathArray[3];  // Η θέση 3 αντιστοιχεί στο username
    const sessionId = pathArray[4];  // Η θέση 4 αντιστοιχεί στο sessionId
    console.log(username);
    console.log(sessionId)
  
    // Έλεγχος αν υπάρχουν οι απαραίτητες παράμετροι
    if (!username || !sessionId) {
      alert('Παρακαλώ προσδιορίστε το όνομα χρήστη και το session ID.');
      return;
    }
  
    // Κλήση της υπηρεσίας FRS για λήψη των αγαπημένων αγγελιών
    const frsUrl = `http://localhost:3500/getFavorites`;
    fetch(frsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, sessionId }),
    })
      .then(response => response.json())
      .then(data => {
        // Έλεγχος επιτυχούς λήψης
        if (data.success) {
          // Καλέστε τη συνάρτηση που θα δημιουργήσει το HTML από το template
          renderFavoriteAds(data.favoriteAds);
        } else {
          alert('Σφάλμα κατά τη λήψη των αγαπημένων αγγελιών.');
        }
      })
      .catch(error => {
        console.error('Σφάλμα κατά την αποστολή του αιτήματος:', error);
      });
  
    // Συνάρτηση που δημιουργεί το HTML από το Handlebars template
    function renderFavoriteAds(favoriteAds) {
      const ads=document.getElementById('f-ads-container')
      const source = document.getElementById('favorite-ads-template').innerHTML;
      const template = Handlebars.compile(source);
      const html = template({ favoriteAds });
      console.log(favoriteAds)
      ads.innerHTML=html;
    }
    
  });
  