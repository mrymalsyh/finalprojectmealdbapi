const mealPlanner = JSON.parse(localStorage.getItem('mealPlanner')) || [];
const plannerList = document.getElementById('planner-list');

// Display planner items
function displayPlanner() {
  const mealPlanner = JSON.parse(localStorage.getItem('mealPlanner')) || [];
  let html = '';

  if (mealPlanner.length > 0) {
    mealPlanner.forEach((meal, index) => {
      html += `
        <div class="planner-item" data-index="${index}">
          <div class="meal-img">
            <img src="${meal.strMealThumb}" alt="meal">
          </div>
          <div class="meal-ingredients">
            <div class="meal-name">${meal.strMeal}</div>
            <button class="add-ingredient-btn" onclick="confirmAddIngredients(${index})">Add Ingredients</button>
            <button class="get-recipe-btn" onclick="getRecipe('${index}')">Get Recipe</button>
            <button class="remove-btn" onclick="confirmRemoveMeal(${index})">Remove</button>
          </div>
        </div>
      `;
    });
  } else {
    html = '<p>No meals in your planner yet.</p>';
  }
  
  plannerList.innerHTML = html;
}

// Remove meal from planner with confirmation
function confirmRemoveMeal(index) {
  if (confirm("Are you sure you want to remove this meal from the planner?")) {
    removeMealFromPlanner(index);
  }
}

function removeMealFromPlanner(index) {
  const mealPlanner = JSON.parse(localStorage.getItem('mealPlanner')) || [];
  mealPlanner.splice(index, 1); // Remove meal from specified index
  localStorage.setItem('mealPlanner', JSON.stringify(mealPlanner)); // Update localStorage

  displayPlanner();
}

// Get recipe details and store them in localStorage
function getRecipe(index) {
  const mealPlanner = JSON.parse(localStorage.getItem('mealPlanner')) || [];
  const selectedMeal = mealPlanner[index];

  localStorage.setItem('selectedMeal', JSON.stringify(selectedMeal));

  window.location.href = 'recipe.html';
}

// Add ingredients from the selected meal to grocery list with confirmation
function confirmAddIngredients(index) {
  if (confirm("Do you want to add these ingredients to your grocery list?")) {
    addIngredients(index);
  }
}

function addIngredients(index) {
  const mealPlanner = JSON.parse(localStorage.getItem('mealPlanner')) || [];
  const selectedMeal = mealPlanner[index];
  
  // Prepare the ingredients array from the selected meal
  const ingredients = [];
  for (let i = 1; i <= 20; i++) { 
    const ingredient = selectedMeal[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient.trim());
    }
  }

  const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

  // Check if ingredients are already in the grocery list and add them if not
  ingredients.forEach(ingredient => {
    if (!groceryList.includes(ingredient) && ingredient !== "") {
      groceryList.push(ingredient);
      localStorage.setItem('groceryList', JSON.stringify(groceryList));
    }
  });

  alert(`Ingredients for ${selectedMeal.strMeal} have been added to your grocery list!`);
}

displayPlanner();
