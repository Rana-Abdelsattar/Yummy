
import {setDescription,getDescription} from './description.js'
export class Area{
    constructor(){
     this.areaData=document.getElementById('areaData');
  
     this.setAreaData();
     this.arealink=document.getElementById("arealink");
     this.arealink.addEventListener('click',()=>{
        $('#home').fadeOut(400,function(){
            $("#category").fadeOut(400,function(){
              $("#search").fadeOut(400,function(){
                $('#area').fadeIn(400);
              })
                
            })  
        })
     })
    
    }

    async getAreaData(){
        let api=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let apiresponse=await api.json();
        let result=apiresponse.meals;
        return result;
    }
    async setAreaData(){
        let array=await this.getAreaData();
        let box=``;
        for(let i=0;i<array.length;i++){
          box+=`     <div class="col-md-3">
          <div class="item">
            <i class="fa-solid fa-house-laptop fa-3x py-2 ms-4 text-white text-center"></i>
            <h3 class="fw-bold text-white " id="${array[i].strArea}">${array[i].strArea}</h3>
          </div>
        </div>`
        }
        this.areaData.innerHTML=box;

           for (let area of array) {
      let areaName = area.strArea;
      let areaH3Element = document.getElementById(areaName);
      areaH3Element.addEventListener("click", async () => {
        await this.setFilterByArea(areaName);

      });
    }

    }

      async FilterByArea(areaname){
        let filterApi=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaname}`);
        let filterResponse=await filterApi.json();
        let result=filterResponse.meals;
        return result;

     }
     async setFilterByArea(area){
        let array=await this.FilterByArea(area);
        let box=``;
        for(let i=0;i<array.length;i++){
          box+=`<div class="col-md-3">
          <div class="item" id="${array[i].idMeal}">
            <img src="${array[i].strMealThumb}" class="w-100" alt="">
            <div class="layer d-flex justify-content-center align-items-center">
              <h3>${array[i].strMeal}</h3>
              <span class=" w-100 h-100 opacity-0">${array[i].idMeal}</span>
            </div>
          </div>
          
        </div>`
        }
        this.areaData.innerHTML=box;

        for (let data of array) {
          let id = data.idMeal;
         
          let Element = document.getElementById(id);
          Element.addEventListener("click", async () => {
            await setDescription(id);
          
           
          });
        }
           
     }
      
     
}
