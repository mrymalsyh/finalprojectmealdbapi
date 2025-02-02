document.addEventListener("DOMContentLoaded", () => {
  const groceryListElement = document.getElementById('grocery-list');
  const ingredientInput = document.getElementById('ingredient-input');
  const ingredientForm = document.getElementById('ingredient-form');
  const clearListBtn = document.getElementById('clear-list-btn');

  // Load grocery list from localStorage
  const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

  // Display grocery items
  groceryList.forEach(ingredient => {
    addGroceryItem(ingredient);
  });

  // Function to add a grocery item to the list
  function addGroceryItem(ingredient) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${ingredient}</span>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    groceryListElement.appendChild(listItem);

    // Delete item with confirmation
    listItem.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm("Are you sure you want to delete this ingredient?")) {
        groceryListElement.removeChild(listItem);
        const index = groceryList.indexOf(ingredient);
        if (index > -1) {
          groceryList.splice(index, 1);
          localStorage.setItem('groceryList', JSON.stringify(groceryList));
        }
        alert("Ingredient deleted successfully.");
      }
    });

    // Edit item with alert
    listItem.querySelector('.edit-btn').addEventListener('click', () => {
      const newIngredient = prompt("Edit ingredient:", ingredient);
      if (newIngredient && newIngredient.trim() !== "") {
        listItem.querySelector('span').textContent = newIngredient;
        const index = groceryList.indexOf(ingredient);
        if (index > -1) {
          groceryList[index] = newIngredient;
          localStorage.setItem('groceryList', JSON.stringify(groceryList));
        }
        alert("Ingredient edited successfully.");
      }
    });
  }

  // Add ingredient with alert
  ingredientForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
      addGroceryItem(ingredient);
      groceryList.push(ingredient);
      localStorage.setItem('groceryList', JSON.stringify(groceryList));
      ingredientInput.value = ''; // Clear the input
      alert("Ingredient added successfully.");
    }
  });

  // Clear list with confirmation
  clearListBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the entire grocery list?")) {
      groceryListElement.innerHTML = ''; // Clear the displayed list
      localStorage.removeItem('groceryList'); // Clear from local storage
      alert("Grocery list cleared successfully.");
    }
  });
});
