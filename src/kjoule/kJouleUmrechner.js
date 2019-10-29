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
        db = datenbank;
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

        //Tabs
        //Container
        let inhalt = document.getElementById("rechnertab");
        let chart = document.getElementById("savedDataKjouleDiv");
        let edit = document.getElementById("editDataKjouleDiv");
        console.log("Nachteile 37 tabChart");
        let tabChart =  document.getElementById("savingButton");
        tabChart.addEventListener('click',()=>{
            console.log("Jaödlsakdad#a");
            showSavedDataHtml(this.db, this._app, null, inhalt, chart, edit);
        });
        let tabRechner =  document.getElementById("kJouleRechnerButton");
        tabRechner.addEventListener('click',()=>{
            showKjouleRechnerHtml(inhalt, chart, edit);
        });
        let tabEdit =  document.getElementById("editierenDataButton");
        tabEdit.addEventListener('click',()=>{
            showEditDataHtml(this.db, this._app, null,inhalt, chart, edit);
        });
        showKjouleRechnerHtml(inhalt, chart, edit);

    }

    onLeave(goon){
        return true;
    }

    get title(){
        return "Bmi-Rechner";
    }
}
export default KjouleRechner;

let showKjouleRechnerHtml = (inhalt, savedDataDiv, editDataDiv) => {
    inhalt.style.display = 'block';
    savedDataDiv.style.display = 'none';
    editDataDiv.style.display = 'none';
};

let showSavedDataHtml = (db, app, loadingID, inhalt, savedDataDiv, editDataDiv) => {
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'block';
    editDataDiv.style.display = 'none';
};
let showEditDataHtml = (db, app, loadingID, inhalt, savedDataDiv, editDataDiv) => {
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'none';
    editDataDiv.style.display = 'block';
    getAndSetData(db, ()=>{
        console.log(labels);
    })
};

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
};


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
let labels = [];
let data = [];
let arrayList = [];
/**
 * Diese Methode muss bei einem Button-Click auf "gespeicherte Werte anzeigen" aufgerufen werden
 * Diese Funktion verarbeitet die vom Server zurückgelieferte Liste.
 * Es muss gewährleistet werden, dass die Elemente die auf  der Datenbank
 * liegen auch dem entsprechend nach einem Button-Click auf dem entsprechendem
 * Feld angezeigt wird.
 */
let getAndSetData = (db, callback) => {
    db.getData('kJoule', (array)=>{
        let counter;
        labels = [array.length];
        data = [array.length];
        console.log(array);
        if (array.length === 0){
            console.log("fertig");
            callback('empty');
        }
        for ( counter = 0; counter<array.length; counter++){
            let element = array[counter];
            labels[counter] = element.timestamp;
            data[counter] = element.maximalkraft;
            if (counter === array.length - 1) {

                callback();
            }
        }
    })
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


