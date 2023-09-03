
export async function getDescription(id) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let respons = await api.json();
  let result = respons.meals;
  return result;
}
export async function setDescription(id) {

  let array = await getDescription(id);
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += `        <div class="col-md-5">
      <div class="item">
        <img src="${array[i].strMealThumb}" class="w-100" alt="">
        <h1>${array[i].strMeal}</h1>
      </div>

    </div>
    <div class="col-md-7">
      <div class="item">
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
        <h3>Tags:</h3>`;

    let tags = array[i].strTags?.split(",");
    if ((tags !== null) & (tags.length > 1)) {
      for (let onetag of tags) {
        box += `<button class="bg-danger btn me-2  mb-2">${onetag}</button>`;
      }
    } else {
      box += `<button class="bg-danger btn me-2  mb-2">${array[i].strTags}</button>`;
    }
    box += `
        <br>
        <button class="bg-success btn">source</button>
        <button class="bg-danger btn"><a class="text-white text-decoration-none" href="${array[i].strYoutube}">Youtube</a></button>
      </div>

    </div>`;
  }

  let xx = document.getElementById("descriptionBox");
  xx.innerHTML = box;
  $("#category").fadeOut(400, function () {
    $("#home").fadeOut(400,function(){
        $("#area").fadeOut(400,function(){
            $("#description").fadeIn(400);
        })
       
    })
    
  });
}
