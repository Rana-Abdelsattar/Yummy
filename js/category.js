import {getDescription, setDescription } from "./description.js";
export class Category {
  constructor() {
    this.categorylink = document.getElementById("categorylink");
    this.categoryData = document.getElementById("categoryData");
    this.categorySection = document.getElementById("category");
    this.FilteredCateory = document.getElementById("FilteredCateory");
    this.mealName = document.querySelectorAll(".mealName");

    this.setCategoryData();
    this.setFilterByCategory();

    this.categorylink.addEventListener("click", () => {
      $("#home").fadeOut(400, function () {
        $("#area").fadeOut(400, function () {
          $("#search").fadeOut(400, function () {
            $("#category").fadeIn(1000);
          });
        });
      });
    });

    // =============================================================================

    this.categoryData.addEventListener("click", async (e) => {
      // debugger;
      let mealname = e.target.dataset.categoryname;
      if (mealname && mealname.length > 0) {
        await this.setFilterByCategory(mealname.trim());
        $("#home").fadeOut(400, function () {
          $("#area").fadeOut(400, function () {
            $("#category").fadeIn(1000, function () {
              $("#categoryData").fadeOut(400, function () {
                $("#FilteredCateory").fadeIn(400);
              });
            });
          });
        });
      }
    });
  }

  async getCategoryData() {
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let respons = await api.json();
    let result = respons.categories;
    return result;
  }

  async setCategoryData() {
    let array = await this.getCategoryData();
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
      cartona += ` <div class="col-md-3" data-categoryName="${array[i].strCategory}">
          <div class="item rounded-2" id="item" data-categoryName="${array[i].strCategory}">
            <img src="${array[i].strCategoryThumb}" class="w-100" alt="" data-categoryName="${array[i].strCategory}" />
            <div class="layer text-center d-flex flex-column align-content-center" data-categoryName="${array[i].strCategory}">
              <h3  class="mealName fs-4 fw-bold ms-2" id="${array[i].strCategory}" data-categoryName="${array[i].strCategory}">
               ${array[i].strCategory}</>
              </h3>
              <p class="fs-6 text-muted overflow-hidden" data-categoryName="${array[i].strCategory}">${array[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>`;
    }
    this.categoryData.innerHTML = cartona;
    // for (const category of array) {
    //   const categoryName = category.strCategory;
    //   const categoryH3Element = document.getElementById(categoryName);
    //   categoryH3Element.addEventListener("click", async () => {
    //     await this.getFilterByCategory(categoryName);
    //   });
    // }
  }

  async getFilterByCategory(meal) {
    
    let apiFilter = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
    );
    let responseFilter = await apiFilter.json();
    let result = responseFilter.meals;
    return result;
  }

  async setFilterByCategory(meal) {
    
    let arrayfilter = await this.getFilterByCategory(meal);
    let cartona2 = ``;
    if (arrayfilter !== null) {
      for (let i = 0; i < arrayfilter.length; i++) {
        cartona2 += ` <div class="col-md-3">
        <div class="item">
          <img src="${arrayfilter[i].strMealThumb}" class="w-100" alt="">
          <div class="layer d-flex justify-content-center align-items-center"  id="${arrayfilter[i].idMeal}">
            <h3>${arrayfilter[i].strMeal}</h3>
            <span class="opacity-0">${arrayfilter[i].idMeal}</span>
          </div>
        </div>
        
      </div>`;
      }
    }

    this.FilteredCateory.innerHTML = cartona2;
    for (let data of arrayfilter) {
      let id = data.idMeal;
      let Element = document.getElementById(id);
      Element.addEventListener("click", async () => {
        await setDescription(id);
      
       
      });
    }
  }

 
}
