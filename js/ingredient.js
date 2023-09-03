import { setDescription,getDescription } from "./description.js";

export class Ingredient {
  constructor() {
    this.ingredientData = document.getElementById("ingredientData");
    this.ingredientlink = document.getElementById("ingredientlink");
    this.setIngredientData();
    this.ingredientlink.addEventListener("click", () => {
      $("#home").fadeOut(400, function () {
        $("#category").fadeOut(400, function () {
          $("#area").fadeOut(400, function () {
            $("#search").fadeOut(400, function () {
              $("#ingredient").fadeIn(400);
            });
          });
        });
      });
    });
  }

  async getIngredientData() {
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let apiresponse = await api.json();
    let result = apiresponse.meals;
    return result;
  }
  async setIngredientData() {
    let array = await this.getIngredientData();
    let box = ``;
    for (let i = 0; i < array.length; i++) {
      let desc = array[i].strDescription;
      if (desc && desc.length > 100) {
        desc = desc.slice(0, 100);
      }
      box += ` <div class="col-md-3">
          <div class="item overflow-hidden">
            <i class="fa-sharp fa-solid fa-drumstick-bite fa-3x text-white"></i>
            <h3 class="text-white" id="${array[i].strIngredient}">${array[i].strIngredient}</h3>
            <p class="text-white" >${desc}</p> 
          </div>
        </div>`;
    }
    this.ingredientData.innerHTML = box;
    for (let name of array) {
      let mealName = name.strIngredient;
      let nameH3Element = document.getElementById(mealName);
      nameH3Element.addEventListener("click", async () => {
        await this.setFilterByIngredientData(mealName);
      });
    }
  }

  // =======================================

  async getFilterByIngredientData(mealname) {
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealname}`
    );
    let apiresponse = await api.json();
    let result = apiresponse.meals;
    return result;
  }

  async setFilterByIngredientData(mealname) {
    let array = await this.getFilterByIngredientData(mealname);

    let box = ``;

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== null) {
        box += ` <div class="col-md-3">
          <div class="item" id="${array[i].idMeal}">
            <img src="${array[i].strMealThumb}" class="w-100" alt="">
            <div class="layer d-flex justify-content-center align-items-center">
              <h3>${array[i].strMeal}</h3>
              <span class=" w-100 h-100 opacity-0">${array[i].idMeal}</span>
            </div>
          </div>
          
        </div>`;
      }
    }
    this.ingredientData.innerHTML = box;
    for (let data of array) {
      let id = data.idMeal;
      let Element = document.getElementById(id);
      Element.addEventListener("click", async function () {
        await setDescription(id);
      });
    }
  }
}
