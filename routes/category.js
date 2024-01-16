


// Εξάγεται η τιμή της παραμέτρου id από το URL
const categoryId = window.location.pathname.split('/').pop();
console.log(categoryId);
console.log(categoryId)

window.addEventListener("load", function () {
  fetchCategoryAds(categoryId)
    .then(renderAds)
    .catch(error => console.error(error));
});

async function fetchCategoryAds(categoryId) {
  try {
    const response = await fetch(`https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderAds(ads) {
  const adsContainer = document.getElementById("ads-container");

  const templateSource = document.getElementById("ad-template").innerHTML;
  const template = Handlebars.compile(templateSource);

  const adsHtml = template({ ads });
  adsContainer.innerHTML= adsHtml;
}
