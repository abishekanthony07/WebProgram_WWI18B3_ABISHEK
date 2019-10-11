"use strict";
import App from "../app.js";
const db = require('./../datenbank/database');
window.addEventListener("load", ()=>{
    db.initializeDB();
    db.loginUser();
   document.getElementById("button").addEventListener("click", rechne);
    document.getElementById("button1").addEventListener("click", rechne1);

});
function rechne1(){
    db.getData("kJoule", (array) =>{
    let kjoulekalorien = document.getElementById('KJOULE');
    let summekjoulekalorien = kjoulekalorien.value / 4.184;
    console.log(summekjoulekalorien);
    summekjoulekalorien.toFixed(2);
    document.getElementById('output1').value = summekjoulekalorien;
        if(array==='empty'){
            array = [{
                kcal:kjoulekalorien.value,
                summekikalorien:summekjoulekalorien,
            }]
        }else{
            array.push({
                kcal:kjoulekalorien.value,
                summekikalorien:summekjoulekalorien,
            });
        }
        db.saveData("kJoule", array);
    });
}


function rechne() {
   db.getData("kJoule", (array) =>{
        let kilokalorien = document.getElementById('Kcal');

        let summekilokalorien  = kilokalorien.value * 4.1868;

        summekilokalorien.toFixed(2);
        console.log(summekilokalorien);
        document.getElementById('output').value = summekilokalorien;


        if(array==='empty'){
           array = [{
               kcal:kilokalorien.value,
               summekikalorien:summekilokalorien,
            }]
        }else{
           array.push({
               kcal:kilokalorien.value,
               summekikalorien:summekilokalorien,
            });
       }
       db.saveData("kJoule", array);
   });
}


