"use strict";
import App from "../app.js";
let db;

let ablaufkJoule = () => {
    document.getElementById("button").addEventListener("click", ()=>{
        rechne();
    });
    document.getElementById("button1").addEventListener("click", ()=>{
        rechne1();
    });

};

class KjouleRechner{
    constructor(app, datenbank){
        this._app = app;
        this.db = datenbank;
        db = this.db;
        this.loadingID = 'kjouleLoading';
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
        ablaufkJoule();
        //Submit Function

    }

    onLeave(goon){
        return true;
    }

    get title(){
        return "Bmi-Rechner";
    }
}
export default KjouleRechner;

let rechne1 =()=>{
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
        db.saveData("kJoule", array,()=>{});
    });
}


let rechne = () =>{
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
               timestamp: App.timeStamp(),
            }]
        }else{
           array.push({
               kcal:kilokalorien.value,
               summekikalorien:summekilokalorien,
               timestamp: App.timeStamp(),
            });
       }
       db.saveData("kJoule", array,()=>{});
   });
};
// let labels = [];
// let data = [];
// let arrayList = [];
// /**
//  * Diese Methode zeigt alle gespeicherten Werte in einem Diagramm an.
//  */
// let showSavedDataHtml = (db, app, loadingID, inhalt, savedDataDiv, editDataDiv) => {
//     inhalt.style.display = 'none';
//     savedDataDiv.style.display = 'block';
//     editDataDiv.style.display = 'none';
//     app.showLoadingscreen(loadingID);
//     getAndSetData(db, (empty) => {
//         if(empty === 'empty'){
//             savedDataDiv.innerHTML = "Sie haben keine Werte abgespeichert!";
//             app.hideLoadingscreen(loadingID);
//         }else{
//             savedDataDiv.innerHTML = "<canvas id=\"myChart\"></canvas>";
//             let myChartObject = document.getElementById('myChart');
//             let chart = new Chart(myChartObject, {
//                 type: "line",
//                 data: {
//                     labels: labels,
//                     datasets: [{
//                         label: "Deine Maximalkraft in Kg",
//                         backgroundColor: 'rgba(159, 96, 96, 0.4)',
//                         borderColor: 'rgba(159, 96, 96, 1)',
//                         data: data
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         yAxes: [{
//                             tricks: {
//                                 beginAtZero: true
//                             }
//                         }]
//                     }
//                 }
//             });
//             app.hideLoadingscreen(loadingID);
//         }
//     });
// };
//
// /**
//  * Diese Methode zeigt die Startseite von der Maximalkraft an.
//  */
// let showOrmRechnerHtml = (inhalt, savedDataDiv, editDataDiv) => {
//     inhalt.style.display = 'block';
//     savedDataDiv.style.display = 'none';
//     editDataDiv.style.display = 'none';
// };
//
// /**
//  * Diese Methode zeigt alle gespeicherten Werte im Editiermodus an.
//  */
// let showEditDataHtml = (db, app, loadingID, inhalt, savedDataDiv, editDataDiv) => {
//     inhalt.style.display = 'none';
//     savedDataDiv.style.display = 'none';
//     editDataDiv.style.display = 'block';
//     app.showLoadingscreen(loadingID);
//     console.log("Datenbank", db);
//     db.getData('bmi', (array) => {
//         let index;
//         arrayList = array;
//         if (array.length===0){
//             editDataDiv.innerHTML ="Sie haben keine Werte gespeichert!";
//         }else{
//             editDataDiv.innerHTML ="";
//         }
//         for (index = 0; index < array.length; index++) {
//             let element = array[index];
//             let newEl = document.createElement("div");
//             newEl.className = "inhalt";
//             //Inhalt wird gesetzt
//             newEl.innerHTML = "<div class='delete'><div class='hidden' id='index'>"+index+"</div><button id='delete'>Löschen?</button>&nbsp;<b>["+element.timestamp+"]&nbsp;</b>Maximalkraft von&nbsp;"+element.ergebnis+" kg</div>";
//             newEl=editDataDiv.appendChild(newEl);
//             //delete Listener wird gesetzt
//             newEl.addEventListener('click',(event)=>{
//                 deleteElement(db, app, loadingID, event, inhalt, savedDataDiv, editDataDiv);
//             });
//         }
//         app.hideLoadingscreen(loadingID);
//     })
// };


