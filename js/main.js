import { Home } from "./home.js";
import { Category } from "./category.js";
import { Area } from "./area.js";
import { Ingredient } from "./ingredient.js";
import { Search } from "./search.js";

new Home();
new Category();
new Area();
new Ingredient();
new Search();



// ============================


$("document").ready(function(){
  $(".lds-dual-ring").fadeOut(700,function(){
    $("#loading").fadeOut(700,function(){
      $("body").css("overflow","auto")
    })
  })
})





// ================================



let nameElement = document.getElementById("name");
let phoneElement = document.getElementById("phone");
let emailElement = document.getElementById("email");
let ageElement = document.getElementById("age");
let passElement = document.getElementById("password");
let repassElement=document.getElementById('repass');
let contactLink=document.getElementById('contactlink')
let formElement = document.getElementById("form");


contactLink.addEventListener("click",function(){
$("#home").fadeOut(400,function(){
  $(".contactUs").fadeIn(400);
})
})



function validateName(name) {
  //debugger;
  let regex1 = /^([a-z']{4,20}(-| )?)+$/i;

  if (regex1.test(name)) {
    return true;
  } else {
    return false;
  }
}
function validatephone(phone) {
  //debugger;
  let regex2 = /^(002){0,1}01[0125][0-9]{8}$/;

  if (regex2.test(phone)) {
    return true;
  } else {
    return false;
  }
}
function validateEmail(mail) {
  var regexEmail = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  if (regexEmail.test(mail)) {
    return true;
  } else {
    return false;
  }
}
function validateAge(age) {
  if (age > 20) return true;
  else return false;
}

function validatePassword(pass) {
  var regexpass =/^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (regexpass.test(regexpass)) {
    return true;
  } else {
    return false;
  }
}
 function validateRepass(repass)
 {
  if(passElement.value==repass)
  {return true;
  }
  else{
    return false;
  }
 }
phoneElement.addEventListener("input", function () {
  $(".telAlert").fadeIn(400, function () {
    validateName(phoneElement.value);
  });
});
nameElement.addEventListener("input", function () {
  $(".NameAlert").fadeIn(400, function () {
    validateName(nameElement.value);
  });
});

emailElement.addEventListener("input", function () {
  $(".emailAlert").fadeIn(400, function () {
    validateEmail(emailElement.value);
  });
});

ageElement.addEventListener("input", function () {
  $(".ageAlert").fadeIn(400, function () {
    validateEmail(ageElement.value);
  });
});
passElement.addEventListener("input", function () {
  $(".passAlert").fadeIn(400, function () {
    validatePassword(passElement.value);
  });
});
repassElement.addEventListener('input',function(){
 
    validateRepass(repassElement.value);

})

function submit(form) {
  let name = form.target.name.value;
  let phone = form.target.phone.value;
  let Email = form.target.email.value;
  let age = form.target.age.value;
  let pass=form.target.password.value;
  let repass=form.target.repass.value
  if (
    validateName(name) == true &&
    validatephone(phone) == true &&
    validateEmail(Email) == true &&
    validateAge(age) == true &&
    validatePassword(pass)==true
    // && pass==repass
   
  ) {
    alert("valid data");
  } else {
    alert("invalid data");
  }
}

formElement.addEventListener("submit", submit);
