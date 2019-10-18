"use strict";
import App from "../app.js";
const db = require('./../datenbank/database');
window.addEventListener("load", () => {
    // db.initializeDB();
    // db.loginUser();
    // let buttonBerechen = document.getElementById('berechnenButton');
    // buttonBerechen.addEventListener("click", () => {
    //     bmiBerechnen();
    // });
    // window.addEventListener("keypress", (p) => {
    //     if (p.key === "Enter") {
    //         bmiBerechnen();
    //     }
    // });
    // //-----------------------Slider an Eingabefeld anpassen -------------------------------------
    // //Groesse
    // document.getElementById("sliderGroesse").addEventListener("input", ()=>{
    //     let sliderGroesse = document.getElementById("sliderGroesse");
    //     let eingabeFeldGroesse = document.getElementById("groesse");
    //
    //     eingabeFeldGroesse.value = sliderGroesse.value;
    // });
    //
    // //Gewicht
    // document.getElementById("sliderGewicht").addEventListener("input", ()=>{
    //     let sliderGewicht = document.getElementById("sliderGewicht");
    //     let eingabeFeldGewicht = document.getElementById("masse");
    //
    //     eingabeFeldGewicht.value = sliderGewicht.value;
    // });
    //
    // //Alter
    // document.getElementById("sliderAlter").addEventListener("input", ()=>{
    //     let sliderAlter = document.getElementById("sliderAlter");
    //     let eingabeFeldAlter = document.getElementById("alter");
    //
    //     eingabeFeldAlter.value = sliderAlter.value;
    // });
    // //--------------------------------------------------------------------------------------------
    // //---------------------- Eingabefeld an Slider anpassen-------------------------------------
    //
    //
    // //---------------------------------------------------------------------------------------------
    //
    // document.querySelector('#open-dialog').addEventListener('click', toggleDialog);
    //
    // document.addEventListener("DOMContentLoaded", function () {
    //     //Polyfill für dialog-Element
    //     document.querySelector('#open-dialog')
    //         .addEventListener('click', toggleDialog);
    // });
    //     function toggleDialog() {
    //         let dialog = document.querySelector('dialog'),
    //             closeButton = document.getElementById('close-dialog');
    //         if (!dialog.hasAttribute('open')) {
    //             // show the dialog
    //             dialog.setAttribute('open', 'open');
    //             // after displaying the dialog, focus the closeButton inside it
    //             closeButton.focus();
    //             closeButton.addEventListener('click', toggleDialog);
    //             // EventListener für ESC-Taste
    //             document.addEventListener('keydown', function (event) {
    //                 if (event.keyCode === 27) {
    //                     toggleDialog();
    //                 }
    //             }, true);
    //             // only hide the background *after* you've moved focus out of the content that will be "hidden"
    //             let div = document.createElement('div');
    //             div.id = 'backdrop';
    //             document.body.appendChild(div);
    //         } else {
    //             dialog.removeAttribute('open');
    //             let div = document.querySelector('#backdrop');
    //             div.parentNode.removeChild(div);
    //             let lastFocus;
    //             lastFocus.focus();
    //         }
    //     }
});

function bmiBerechnen() {
    db.getData("bmi",  (array) => {
        let eingabeGroesse = document.getElementById("groesse").value;
        let eingabeGewicht = document.getElementById("masse").value;
        let ergebnis = eingabeGewicht / Math.pow(eingabeGroesse / 100, 2);
        let anzeige = document.getElementById("ausgabe");
        ergebnis = ergebnis.toFixed(2);
        if(array === 'empty'){
            array = [{
                eingabeGroesse: eingabeGroesse,
                eingabeGewicht: eingabeGewicht,
                ergebnis: ergebnis
            }]
        }else{
            array.push({
                eingabeGroesse: eingabeGroesse,
                eingabeGewicht: eingabeGewicht,
                ergebnis: ergebnis
            });
        }
        db.saveData("bmi", array);
        hintergrundAngleichen(ergebnis, anzeige);
        ergebnis = " " + ergebnis.bold();
        anzeige.innerHTML = " <b>Dein BMI ist: </b> &nbsp;" + ergebnis + "<b>.</b>";
        anzeige.style.display = 'flex';
    });
}

function hintergrundAngleichen(ergebnis, anzeige) {
    if (ergebnis < 16) {
        anzeige.style.backgroundColor = "#7c7cbc";
    } else if (ergebnis > 16 && ergebnis < 17) {
        anzeige.style.backgroundColor = "#7c7cfc";
    } else if (ergebnis > 17 && ergebnis < 18.5) {
        anzeige.style.backgroundColor = "#7cfcfc";
    } else if (ergebnis > 18.5 && ergebnis < 25) {
        anzeige.style.backgroundColor = "#7cfc7c";
    } else if (ergebnis > 25 && ergebnis < 30) {
        anzeige.style.backgroundColor = "#fcfc7c";
    } else if (ergebnis > 30 && ergebnis < 35) {
        anzeige.style.backgroundColor = "#fcbb91";
    } else if (ergebnis > 35 && ergebnis < 40) {
        anzeige.style.backgroundColor = "#fc9191";
    } else if (ergebnis >= 40) {
        anzeige.style.backgroundColor = "#c08080";
    }
}