// DIV_3 Crear elementos y funciones para bebidas aleatorias.
let randomDrinksBtn = document.createElement("button");
randomDrinksBtn.textContent = "Bebidas aleatorias";
let buttonContainer3 = document.getElementById("button-container-3");
let drinkInfoContainer = document.getElementById("drink-info-container-3");

buttonContainer3.appendChild(randomDrinksBtn);

// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", async function () {
  let drink = await randomDrinkApi();
  if (drink) {
    let ingredientsHTML = "";
    for (let i = 1; i <= 15; i++) {
      let ingredient = drink[`strIngredient${i}`];
      let measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredientsHTML += `${measure ? measure + " " : ""}${ingredient}`;
      }
    }
    drinkInfoContainer.innerHTML = `
      <h3>${drink.strDrink}</h3>
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="max-width: 200px;">
      <p><strong>Categoría:</strong> ${drink.strCategory}</p>
      <p><strong>Es Alcoholica?:</strong> ${drink.strAlcoholic}</p>
      <p><strong>Ingredientes:</strong> ${ingredientsHTML}</p>
      <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
    `;
  } else {
    drinkInfoContainer.textContent =
      "No se pudo obtener la bebida, intenta de nuevo.";
  }
});

// Evento para obtener una nueva bebida aleatoria al hacer clic en el boton
randomDrinksBtn.addEventListener("click", async function () {
  let drink = await randomDrinkApi();
  if (drink) {
    let ingredientsHTML = "";
    for (let i = 1; i <= 15; i++) {
      let ingredient = drink[`strIngredient${i}`];
      let measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredientsHTML += `${measure ? measure + " " : ""}${ingredient}`;
      }
    }
    drinkInfoContainer.innerHTML = `
      <h3>${drink.strDrink}</h3>
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="max-width: 200px;">
      <p><strong>Categoría:</strong> ${drink.strCategory}</p>
      <p><strong>Es Alcoholica?:</strong> ${drink.strAlcoholic}</p>
      <p><strong>Ingredientes:</strong> ${ingredientsHTML}</p>
      <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
    `;
  } else {
    drinkInfoContainer.textContent =
      "No se pudo obtener la bebida, intenta de nuevo.";
  }
});

// Funcion que llama a la API para obtener una bebida aleatoria
async function randomDrinkApi() {
  try {
    let resultApi = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    let data = await resultApi.json();

    let drink = data.drinks[0];

    return drink;
  } catch (error) {
    console.log(error);
  }
}
