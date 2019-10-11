"use strict";
import App from "../app.js";
import stylesheet from "./kJouleUmrechner.css";
window.addEventListener("load", ()=>{
   document.getElementById("button").addEventListener("click", rechne);
    document.getElementById("button1").addEventListener("click", rechne1);

});
function rechne1(){
    let kjoulekalorien = document.getElementById('KJOULE');
    let summekjoulekalorien = kjoulekalorien.value / 4.184;
    console.log(summekjoulekalorien);
    summekjoulekalorien.toFixed(2);
    document.getElementById('output1').value = summekjoulekalorien;
}


function rechne() {
  //  getData("kJoule", (array) =>{
        let kilokalorien = document.getElementById('Kcal');

        let summekilokalorien  = kilokalorien.value * 4.1868;

        summekilokalorien.toFixed(2);
        console.log(summekilokalorien);
        document.getElementById('output').value = summekilokalorien;


        //if(array==='empty'){
           // array = [{
             //   kcal:kilokalorien.value,
              //  kjoule:kjoulekalorien.value,
               // summekikalorien:summekilokalorien,
             //   summekjkalorien:summekjoulekalorien
            //}]
        //}else{
          //  array.push({
            //    kcal:kilokalorien.value,
                //kjoule:kjoulekalorien.value,
              //  summekikalorien:summekilokalorien,
              //  summekjkalorien:summekjoulekalorien
            //});
      //  }
        //saveData("kJoule", array);
//    });
}


