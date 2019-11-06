"use strict";

import App from "../app";

let chartContent;
let editContent;
let savedBMIButton;
let bmiRechnerButton;
let changeBMIData;
let savedBMIContent;

class BmiRechner {
    //Konstruktor zum Zuweisen von Datenbank und App
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
        this.loadingID = 'bmiLoading';
    }

    onShow() {
        let section = document.querySelector("#bmiSeite").cloneNode(true);
        return {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
    }

    onLoad() {
        chartContent = document.getElementById("savedBMIDataDiv");
        editContent = document.getElementById("editBMIDataDiv");
        savedBMIContent = document.getElementById('mainpage');
        savedBMIButton = document.getElementById('savingBMIButton');
        bmiRechnerButton = document.getElementById('main');
        changeBMIData = document.getElementById('bmiDataButton');
        ablaufBMI(this.db);

        savedBMIButton.addEventListener("click", () => {
            showSavedDataHtml(this._app, savedBMIContent, chartContent, editContent);
        });
        bmiRechnerButton.addEventListener("click", () => {
            showBMIHtml(savedBMIContent, chartContent, editContent);
        });
        changeBMIData.addEventListener("click", () => {
            showEditDataHtml(this._app,savedBMIContent, chartContent, editContent);
        });
        showBMIHtml(savedBMIContent, chartContent, editContent);
    }

    onLeave() {
        return true;
    }

    get title() {
        return "Bmi-Rechner";
    }
}

export default BmiRechner;

let showBMIHtml = (bmiRechnerButton, savedBMIButton, bmiDataButton) => {
    bmiRechnerButton.style.display = 'block';
    savedBMIButton.style.display = 'none';
    bmiDataButton.style.display = 'none';
};

let showSavedDataHtml = (app, inhalt, savedDataDiv, editDataDiv) => {
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'block';
    editDataDiv.style.display = 'none';
    app.getAndSetData('bmi', savedDataDiv, "bmiLoading", "BMIChart", "BMI - Ergebnisse", ()=>{
    });
};

let showEditDataHtml = (app, inhalt, savedDataDiv, editDataDiv) => {
    app.getAndSetEditDataFirebase('bmi', editDataDiv, "bmiLoading", inhalt, savedDataDiv, ()=>{
        inhalt.style.display = 'none';
        savedDataDiv.style.display = 'none';
        editDataDiv.style.display = 'block';
    }, ()=>{
        showEditDataHtml(app, inhalt, savedDataDiv, editDataDiv);
    })
};

//Methode zum Berechnen vom BMI und anpassen des Hintergrunds
let bmiBerechnen = (db) => {
    let eingabeGroesse = document.getElementById("groesse");
    let eingabeGewicht = document.getElementById("masse");
    if (eingabeGroesse.checkValidity() && eingabeGewicht.checkValidity()) {
        eingabeGewicht = eingabeGewicht.value;
        eingabeGroesse = eingabeGroesse.value;
        db.getData("bmi", (array) => {
            let ergebnis = eingabeGewicht / Math.pow(eingabeGroesse / 100, 2);
            let anzeige = document.getElementById("ausgabe");
            ergebnis = ergebnis.toFixed(2);
            if (array === 'empty') {
                array = [{
                    eingabeGroesse: eingabeGroesse,
                    eingabeGewicht: eingabeGewicht,
                    ergebnis: ergebnis,
                    timestamp: App.timeStamp(),
                }]
            } else {
                array.push({
                    eingabeGroesse: eingabeGroesse,
                    eingabeGewicht: eingabeGewicht,
                    ergebnis: ergebnis,
                    timestamp: App.timeStamp(),
                });
            }
            db.saveData("bmi", array, () => {
            });
            hintergrundAngleichen(ergebnis, anzeige);
            ergebnis = " " + ergebnis.bold();
            anzeige.innerHTML = " <b>Dein BMI beträgt: </b> &nbsp;" + ergebnis + "<b>.</b>";
            anzeige.style.display = 'flex';
        });
    }
};

let ablaufBMI = (db) => {
    let buttonBerechen = document.getElementById('berechnenButton');
    buttonBerechen.addEventListener("click", () => {
        bmiBerechnen(db);
    });
    window.addEventListener("keypress", (p) => {
        if (p.key === "Enter") {
            bmiBerechnen(db);
        }
    });
    //-----------------------Slider an Eingabefeld anpassen -------------------------------------
    //Groesse
    document.getElementById("sliderGroesse").addEventListener("input", () => {
        let sliderGroesse = document.getElementById("sliderGroesse");
        let eingabeFeldGroesse = document.getElementById("groesse");

        eingabeFeldGroesse.value = sliderGroesse.value;
    });

    //Gewicht
    document.getElementById("sliderGewicht").addEventListener("input", () => {
        let sliderGewicht = document.getElementById("sliderGewicht");
        let eingabeFeldGewicht = document.getElementById("masse");

        eingabeFeldGewicht.value = sliderGewicht.value;
    });

    //Alter
    document.getElementById("sliderAlter").addEventListener("input", () => {
        let sliderAlter = document.getElementById("sliderAlter");
        let eingabeFeldAlter = document.getElementById("alter");

        eingabeFeldAlter.value = sliderAlter.value;
    });

    document.querySelector('#open-dialog').addEventListener('click', toggleDialog);

    document.addEventListener("DOMContentLoaded", function () {
        //Polyfill für dialog-Element
        document.querySelector('#open-dialog')
            .addEventListener('click', toggleDialog);
    });
};

//Zum Angleichen des Hintergrunds
let hintergrundAngleichen = (ergebnis, anzeige) => {
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
};
//"Schon gewusst" Button
let toggleDialog = () => {
    let dialog = document.querySelector('dialog'),
        closeButton = document.getElementById('close-dialog');
    if (!dialog.hasAttribute('open')) {
        dialog.setAttribute('open', 'open');
        closeButton.focus();
        closeButton.addEventListener('click', toggleDialog);
        // EventListener für ESC-Taste
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                toggleDialog();
            }
        }, true);
        let div = document.createElement('div');
        div.id = 'backdrop';
        document.body.appendChild(div);
    } else {
        dialog.removeAttribute('open');
        let div = document.querySelector('#backdrop');
        div.parentNode.removeChild(div);
    }
};