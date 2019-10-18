"use strict";
import App from "../app.js";

class KjouleRechner{
    constructor(app, datenbank){
        this._app = app;
        this.db = datenbank;
    }

    onShow(){
        let section = document.querySelector("#kjouleSeite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        return content;
    }

    onLoad(){
        console.log('Page loaded');

        //Submit Function
        window.addEventListener("load", ()=>{
            document.getElementById("button").addEventListener("click", ()=>{
                rechne(this.db);
            });
             document.getElementById("button1").addEventListener("click", ()=>{
                 rechne1(this.db);
             });

        });
    }

    onLeave(goon){
        return true;
    }

    get title(){
        return "Bmi-Rechner";
    }
}
export default KjouleRechner;

function rechne1(db){
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


function rechne(db) {
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


