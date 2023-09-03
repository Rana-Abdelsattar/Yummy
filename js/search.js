
export class Search {
  constructor() {
    this.SearchByName = document.getElementById("searchByName");
    this.searchByLetter = document.getElementById("searchByLetter");
    this.boxContainerElement = document.getElementById("searchByLetterBox");
    this.searchlink=document.getElementById('searchlink')
  

    this.searchlink.addEventListener("click", () => {
      $("#home").fadeOut(400, function () {
        $("#category").fadeOut(400, function () {
          $("#area").fadeOut(400, function () {
            $("#ingredient").fadeOut(400,function(){
              $("#search").fadeIn(400);
            });
          });
        });
      });
    });




    this.searchByLetter.addEventListener("input", async () => {
      let letter = this.searchByLetter.value;
      this.setDataByLetter(letter);
    });


    this.SearchByName.addEventListener("input", async ()=>
    {
      let name =this.SearchByName.value;
      this.setDataByName(name);
      

    })
  

  

  }
// ================================search by name============================

async getDataByName(name) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let respons = await api.json();
  let result = respons.meals;
  return result;
}

async setDataByName(name) {
    
  if (!name) {
    this.boxContainerElement.innerHTML = "";
    return;
  }
  let array = await this.getDataByName(name);
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += ` <div class="col-md-3">
       <div class="item rounded-2">
         <img src="${array[i].strMealThumb}" class="w-100" alt="" />
          <div class="layer text-center d-flex flex-column align-content-center">
           <h3  class="fs-4 fw-bold ms-2">${array[i].strMeal}</h3>
           <span class="w-100 h-100 opacity-0" id="${array[i].idMeal}">${array[i].idMeal}</span>
         </div>
       </div>
     </div>`;
  }
  this.boxContainerElement.innerHTML = box;

  for (let data of array) {
    let id = data.idMeal;
    let spanElement = document.getElementById(id);
    spanElement.addEventListener("click", async () => {
      await this.setDescription(id);
    
    }) 
}
}

  
// =================================search by letter==========================
  async getDataByLetter(letter) {
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let respons = await api.json();
    let result = respons.meals;
    return result;
  }
  async setDataByLetter(letter) {
    
    if (!letter) {
      this.boxContainerElement.innerHTML = "";
      return;
    }
    let array = await this.getDataByLetter(letter);
    let box = ``;
    for (let i = 0; i < array.length; i++) {
      box += ` <div class="col-md-3">
         <div class="item rounded-2">
           <img src="${array[i].strMealThumb}" class="w-100" alt="" />
            <div class="layer text-center d-flex flex-column align-content-center">
             <h3  class="fs-4 fw-bold ms-2">${array[i].strMeal}</h3>
             <span class="w-100 h-100 opacity-0" id="${array[i].idMeal}">${array[i].idMeal}</span>
           </div>
         </div>
       </div>`;
    }
    this.boxContainerElement.innerHTML = box;

    for (let data of array) {
      let id = data.idMeal;
      let spanElement = document.getElementById(id);
      spanElement.addEventListener("click", async () => {
        await this.setDescription(id);
      
      }) 
  }
  }





  // =================================================section description 



  
async getDescription(id) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let respons = await api.json();
  let result = respons.meals;
  return result;
}
async setDescription(id) {
  
  let array = await this.getDescription(id);
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += `        <div class="col-md-5">
    <div class="item text-white">
      <img src="${array[i].strMealThumb}" class="w-100" alt="">
      <h1>${array[i].strMeal}</h1>
    </div>
 
  </div>
  <div class="col-md-7">
    <div class="item text-white">
      <h3>Instructions</h3>
      <p id="paragraph">${array[i].strInstructions}</p>
      <h3>Area: <span id="descArea">${array[i].strArea}</span> </h3>
      <h3>Category: <span id="descCategory">${array[i].strCategory}</span></h3>
      <h3>Recipes:</h3>
      <button class="bg-info btn me-2 mb-2">${array[i].strMeasure1} ${array[i].strIngredient1}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure2} ${array[i].strIngredient2}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure3} ${array[i].strIngredient3}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure4} ${array[i].strIngredient4}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure5} ${array[i].strIngredient5}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure6} ${array[i].strIngredient6}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure7} ${array[i].strIngredient7}</button>
      <button class="bg-info btn me-2  mb-2">${array[i].strMeasure8} ${array[i].strIngredient8}</button>
      <h3>Tags:</h3>
      <button class="bg-danger btn me-2  mb-2">${array[i].strTags}</button>
      <br>
      <button class="bg-success btn">source</button>
      <button class="bg-danger btn"><a class="text-white text-decoration-none" href="${array[i].strYoutube}">Youtube</a></button>
    </div>
 
  </div>`;
  }
  this.boxContainerElement.innerHTML = box;
}

}
