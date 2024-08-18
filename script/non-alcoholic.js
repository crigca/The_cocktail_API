// DIV_4 Crear elementos y funciones para bebidas sin alcohol
let nonAlcoholicDrinksBtn = document.createElement("button");
nonAlcoholicDrinksBtn.textContent = "Bebidas sin alcohol";
let buttonContainer4 = document.getElementById("button-container-4");
let nonAlcoholicInfoContainer = document.getElementById(
  "drink-info-container-4"
);

buttonContainer4.appendChild(nonAlcoholicDrinksBtn);

// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", async function () {
  let drinkNonAlcoholic = await nonAlcoholicDrinkApi();
  if (drinkNonAlcoholic) {
    let drinkDetails = await getDrinkDetails(drinkNonAlcoholic.idDrink);
    displayNonAlcoholicDrinkInfo(drinkDetails);
  } else {
    nonAlcoholicInfoContainer.textContent =
      "No se pudo obtener la bebida, intenta de nuevo.";
  }
});

// Evento para obtener una nueva bebida sin alcohol al hacer clic en el boton
nonAlcoholicDrinksBtn.addEventListener("click", async function () {
  let drinkNonAlcoholic = await nonAlcoholicDrinkApi();
  if (drinkNonAlcoholic) {
    let drinkDetails = await getDrinkDetails(drinkNonAlcoholic.idDrink);
    displayNonAlcoholicDrinkInfo(drinkDetails);
  } else {
    nonAlcoholicInfoContainer.textContent =
      "No se pudo obtener la bebida, intenta de nuevo.";
  }
});

// Funcion que muestra la informacion completa de la bebida sin alcohol
function displayNonAlcoholicDrinkInfo(drink) {
  let ingredientsHTML = "";
  for (let i = 1; i <= 15; i++) {
    let ingredient = drink[`strIngredient${i}`];
    let measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredientsHTML += `${measure ? measure + " " : ""}${ingredient}<br>`;
    }
  }
  nonAlcoholicInfoContainer.innerHTML = `
  <h3>${drink.strDrink}</h3>
  <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="max-width: 200px;">
  <p><strong>Categoría:</strong> ${drink.strCategory}</p>
  <p><strong>Es Alcohólica?:</strong> ${drink.strAlcoholic}</p>
  <p><strong>Ingredientes:</strong><br> ${ingredientsHTML}</p>
  <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
`;
}

// Funcion que llama a la API para obtener una bebida sin alcohol aleatoria
async function nonAlcoholicDrinkApi() {
  try {
    let resultApi = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
    );
    let data = await resultApi.json();

    let randomIndex = Math.floor(Math.random() * data.drinks.length);
    let drink = data.drinks[randomIndex];

    return drink;
  } catch (error) {
    console.log(error);
  }
}
