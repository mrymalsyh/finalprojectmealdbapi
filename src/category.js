fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(response => response.json())
            .then(data => {
                const categoriesContainer = document.getElementById('categories');
                data.categories.forEach(category => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'planner-item';
                    categoryDiv.innerHTML = `
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                        <div>
                            <h3>${category.strCategory}</h3>
                            <p>${category.strCategoryDescription}</p>
                        </div>
                    `;
                    categoriesContainer.appendChild(categoryDiv);
                });
            })