

window.addEventListener("load", function () {
  fetchCategories()
    .then(renderCategories)
    .catch(error => console.error(error));
});

async function fetchCategories() {
  try {
    const response = await fetch('https://wiki-ads.onrender.com/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchSubcategories(categoryId) {
  try {
    const response = await fetch(`https://wiki-ads.onrender.com/categories/${categoryId}/subcategories`);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderCategories(categories) {
  console.log(categories);
  const categoriesContainer = document.getElementById("categories-container");

  const templateSource = document.getElementById("category-template").innerHTML;
  const template = Handlebars.compile(templateSource);

  for (const category of categories) {
    const categoryHtml = template(category);
    categoriesContainer.innerHTML += categoryHtml;

    const subcategoriesList = document.createElement("ul");
    const subcategories = await fetchSubcategories(category.id);
    
    if (subcategories.length > 0) {
      subcategoriesList.innerHTML = "<b><u>ΥΠΟΚΑΤΗΓΟΡΙΕΣ:</u></b>";

      subcategories.forEach(subcategory => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="category/${subcategory.id}">${subcategory.title}</a>`;
        subcategoriesList.appendChild(listItem);
      });

      categoriesContainer.appendChild(subcategoriesList);
    }
  }
}
