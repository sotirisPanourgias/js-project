// Εξάγετε το μονοπάτι από το URL
const path = window.location.pathname;

// Διαχωρίσει το μονοπάτι χρησιμοποιώντας το "/" ως διαχωριστικό
const pathSegments = path.split("/");

// Βρισκει τον αριθμό από το τελευταίο τμήμα του μονοπατιού
const lastSegment = pathSegments[pathSegments.length - 1];

// Διαχωρίσει τον αριθμό χρησιμοποιώντας το "&" ως διαχωριστικό
const numbers = lastSegment.split("&");

// Ελέγχει αν υπάρχουν δύο αριθμοί και αποθηκεύστε τους σε μεταβλητές
const subId = numbers.length > 0 ? numbers[0] : null;
const adId = numbers.length > 1 ? numbers[1] : null;

console.log("SubId:", subId);
console.log("AdId:", adId);



window.addEventListener("load", function () {
    
    
    
    
  
    fetch(`https://wiki-ads.onrender.com/ads?subcategory=${subId}`)
      .then(response => response.json())
      .then(ads => {
        const selectedAd = ads.find(ad => ad.id == adId);
  
        // Χρησιμοποιει το Handlebars για να συνθέσετε το HTML με βάση το template
        const templateSource = document.getElementById("ad-template").innerHTML;
        const template = Handlebars.compile(templateSource);
        const adHtml = template(selectedAd);
  
        // Εμφανίσει το HTML στο κατάλληλο στοιχείο στη σελίδα
        const adContainer = document.getElementById("ads-container");
        adContainer.innerHTML = adHtml;
      })
      .catch(error => console.error(error));
  });
  Handlebars.registerHelper('splitFeatures', function(features) {
    if (features) {
      return features.split(';').map(feature => feature.trim());
    } else {
      return [];
    }
  });
  Handlebars.registerHelper('splitFeatureValue', function(feature) {
    if (feature) {
      return feature.split(':').map(value => value.trim());
    } else {
      return [];
    }
  });
  