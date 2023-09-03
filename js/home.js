import {setDescription,getDescription} from './description.js'


export class Home{
    constructor(){
     this.BurgarIcon=document.getElementById('BurgarIcon');
     this.navBar=document.getElementById('navBar');
     this.navBarWidth=$("#navBar").outerWidth(true);
     this.closeIcon=document.getElementById('closeIcon');
     this.dataInRow=document.getElementById('dataInRow')
   //   this.homeData=[];
     $('#sideBar').css('left',-this.navBarWidth)
    
     this.BurgarIcon.addEventListener('click',()=>{
        this.showSideBar();
        new WOW().init();
     })
     this.closeIcon.addEventListener('click',()=>{
        this.closeSideBar();
      
     })
    
    this.setHomeData();
  
    }
    showSideBar()
    {
       this.closeIcon.classList.remove('d-none')
       this.BurgarIcon.classList.add('d-none');
       
        $('#sideBar').animate({left:'0px'})
 
    }
    closeSideBar(){
        this.BurgarIcon.classList.remove('d-none');
        this.closeIcon.classList.add('d-none') ;

           $('#sideBar').animate({left:-this.navBarWidth},400)
    
    }
   async getHomeData()
    {
       let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
       let response = await api.json();
       let result=response.meals;
       return result;

    }
     async setHomeData()
    {
        let array = await this.getHomeData();
        let box=``;
        for(let i=0;i<array.length;i++)
        {
            box+=`<div class="col-md-3">
            <div class="item rounded-2">
              <img src="${array[i].strMealThumb}" class="w-100" alt="">
              <div class="layer d-flex align-items-center" id="${array[i].idMeal}">
                <p id="imgName" class="fs-4 fw-bold ms-2">${array[i].strMeal}</p>
                <span class=" w-100 h-100 opacity-0">${array[i].idMeal}</span>
              </div>
            </div>
          </div>`
        }
        this.dataInRow.innerHTML=box;
        for (let data of array) {
          let id = data.idMeal;
          let Element = document.getElementById(id);
          Element.addEventListener("click", async () => {
            await setDescription(id);
          
          }) 
      }


    }

    // ================================================================description
    // async getDescription(id) {
    //   let api = await fetch(
    //     `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    //   );
    //   let respons = await api.json();
    //   let result = respons.meals;
    //   return result;
    // }
    // async setDescription(id) {
      
    //   let array = await this.getDescription(id);
    //   let box = ``;
    //   for (let i = 0; i < array.length; i++) {
    //     box += `        <div class="col-md-5">
    //     <div class="item text-white">
    //       <img src="${array[i].strMealThumb}" class="w-100" alt="">
    //       <h1>${array[i].strMeal}</h1>
    //     </div>
     
    //   </div>
    //   <div class="col-md-7">
    //     <div class="item text-white">
    //       <h3>Instructions</h3>
    //       <p id="paragraph">${array[i].strInstructions}</p>
    //       <h3>Area: <span id="descArea">${array[i].strArea}</span> </h3>
    //       <h3>Category: <span id="descCategory">${array[i].strCategory}</span></h3>
    //       <h3>Recipes:</h3>
    //       <button class="bg-info btn me-2 mb-2">${array[i].strMeasure1} ${array[i].strIngredient1}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure2} ${array[i].strIngredient2}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure3} ${array[i].strIngredient3}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure4} ${array[i].strIngredient4}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure5} ${array[i].strIngredient5}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure6} ${array[i].strIngredient6}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure7} ${array[i].strIngredient7}</button>
    //       <button class="bg-info btn me-2  mb-2">${array[i].strMeasure8} ${array[i].strIngredient8}</button>
    //       <h3>Tags:</h3>
    //       <button class="bg-danger btn me-2  mb-2">${array[i].strTags}</button>
    //       <br>
    //       <button class="bg-success btn">source</button>
    //       <button class="bg-danger btn"><a class="text-white text-decoration-none" href="${array[i].strYoutube}">Youtube</a></button>
    //     </div>
     
    //   </div>`;
    //   }
    //   this.dataInRow.innerHTML = box;
    // }
}