const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipe = async (quer) => {
  const data = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

  const response = (await data).json();


  recipeContainer.innerHTML = "";
  response.meal.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}" >
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
    <p>${meal.strCategory}</p>

    `

    recipeContainer.appendChild(recipeDiv);
  })

}



searchBox.addEventListener('click', (e) => {
  e.preventDefault();


  console.log("button Clicked")
})