// DIV_2 Crear elementos y funciones para bebidas alcoholicas
let alcoholicDrinksBtn = document.createElement("button");
alcoholicDrinksBtn.textContent = "Bebidas alcoholicas";
let buttonContainer2 = document.getElementById("button-container-2");
let alcoholicInfoContainer = document.getElementById("drink-info-container-2");

buttonContainer2.appendChild(alcoholicDrinksBtn);

// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", async function () {
  let drinkAlcoholic = await alcoholicDrinkApi();
  if (drinkAlcoholic) {
    let drinkDetails = await getDrinkDetails(drinkAlcoholic.idDrink);
    displayDrinkInfo(drinkDetails);
  } else {
    alcoholicInfoContainer.textContent =
      "No se pudo obtener la bebida, intenta de nuevo.";
  }
});

// Evento para obtener una nueva bebida al hacer clic en el boton
alcoholicDrinksBtn.addEventListener("click", async function () {
  let drinkAlcoholic = await alcoholicDrinkApi();
  if (drinkAlcoholic) {
    let drinkDetails = await getDrinkDetails(drinkAlcoholic.idDrink);
    displayDrinkInfo(drinkDetails);
  } else {
    alcoholicInfoContainer.textContent =
      "No se pudo obtener la bebida, intenta de nuevo.";
  }
});

// Funcion que muestra la informacion completa de la bebida
function displayDrinkInfo(drink) {
  let ingredientsHTML = "";
  for (let i = 1; i <= 15; i++) {
    let ingredient = drink[`strIngredient${i}`];
    let measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredientsHTML += `${measure ? measure + " " : ""}${ingredient}<br>`;
    }
  }
  alcoholicInfoContainer.innerHTML = `
  <h3>${drink.strDrink}</h3>
  <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="max-width: 200px;">
  <p><strong>Categoría:</strong> ${drink.strCategory}</p>
  <p><strong>Es Alcohólica?:</strong> ${drink.strAlcoholic}</p>
  <p><strong>Ingredientes:</strong><br> ${ingredientsHTML}</p>
  <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
`;
}

// Funcion que llama a la API para obtener una bebida alcoholica aleatoria
async function alcoholicDrinkApi() {
  try {
    let resultApi = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
    );
    let data = await resultApi.json();

    let randomIndex = Math.floor(Math.random() * data.drinks.length);
    let drink = data.drinks[randomIndex];

    return drink;
  } catch (error) {
    console.log(error);
  }
}

// Funcion que llama a la API para obtener detalles de una bebida especifica
async function getDrinkDetails(idDrink) {
  try {
    let resultApi = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    );
    let data = await resultApi.json();

    let drink = data.drinks[0];
    return drink;
  } catch (error) {
    console.log(error);
  }
}
