"use strict";

class BmiRechner {
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
    }

    onShow() {

        let section = document.querySelector("#bmiSeite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        return content;

    }

    onLoad() {
        console.log('Page loaded');
        ablaufBMI(this.db);
    }

    onLeave(goon) {
        return true;
    }

    get title() {
        return "Bmi-Rechner";
    }
}

export default BmiRechner;


let bmiBerechnen = (db) => {
    db.getData("bmi", (array) => {
        let eingabeGroesse = document.getElementById("groesse").value;
        let eingabeGewicht = document.getElementById("masse").value;
        let ergebnis = eingabeGewicht / Math.pow(eingabeGroesse / 100, 2);
        let anzeige = document.getElementById("ausgabe");
        ergebnis = ergebnis.toFixed(2);
        if (array === 'empty') {
            array = [{
                eingabeGroesse: eingabeGroesse,
                eingabeGewicht: eingabeGewicht,
                ergebnis: ergebnis
            }]
        } else {
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
};

let ablaufBMI = (db) => {
    console.log("Test aufgerufen", db);
    let buttonBerechen = document.getElementById('berechnenButton');
    console.log(buttonBerechen.innerText);
    buttonBerechen.addEventListener("click", () => {
        console.log("blalblalba");
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

    console.log("test zuende");
};

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
}

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
        let lastFocus;
        lastFocus.focus();
    }
}

/**
 * Diese Methode zeigt alle gespeicherten Werte in einem Diagramm an.
 */
let showSavedDataHtml = (db, inhalt, savedDataDiv, editDataDiv) => {
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'block';
    editDataDiv.style.display = 'none';
    getAndSetData(db, () => {
        let myChartObject = document.getElementById('myChart');
        let chart = new Chart(myChartObject, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Deine Maximalkraft in Kg",
                    backgroundColor: 'rgba(159, 96, 96, 0.4)',
                    borderColor: 'rgba(159, 96, 96, 1)',
                    data: data
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        tricks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
}

let labels = [];
let data = [];
let arrayList = [];

/**
 * Diese Methode zeigt alle gespeicherten Werte im Editiermodus an.
 */
let showEditDataHtml = (db, inhalt, savedDataDiv, editDataDiv) =>{
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'none';
    editDataDiv.style.display = 'block';
    console.log("Datenbank", db);
    db.getData('orm', (array) => {
        let index;
        arrayList = array;
        if (array.length===0){
            editDataDiv.innerHTML ="Sie haben keine Werte gespeichert!";
        }else{
            editDataDiv.innerHTML ="";
        }
        for (index = 0; index < array.length; index++) {
            let element = array[index];
            let newEl = document.createElement("div");
            newEl.className = "inhalt";
            //Inhalt wird gesetzt
            newEl.innerHTML = "<div class='delete'><div class='hidden' id='index'>"+index+"</div><button id='delete'>Löschen?</button>&nbsp;<b>["+element.timestamp+"]&nbsp;</b>Maximalkraft von&nbsp;"+element.maximalkraft+" kg</div>";
            newEl=editDataDiv.appendChild(newEl);
            //delete Listener wird gesetzt
            newEl.addEventListener('click',(event)=>{
                deleteElement(db,event, inhalt, savedDataDiv, editDataDiv);
            });
        }
    })
}

let deleteElement = (db ,event, inhalt, savedDataDiv, editDataDiv)=>{
    let deleteIndex = event.target.parentNode.firstChild.textContent;
    arrayList.splice(deleteIndex, 1);
    db.saveData('orm', arrayList, ()=>{
        editDataDiv.innerHTML ="Sie haben keine Werte gespeichert!";
        showEditDataHtml(inhalt, savedDataDiv,editDataDiv);
    });

}

/**
 * Diese Methode berechnet und ergänzt die vom Server geholte Liste mit neuen Werten.
 */
let berechne=(db) => {
    db.getData('orm', (array)=>{
        let gewicht = document.getElementById('gewicht');
        let wiederholungszahl = document.getElementById('wiederholungszahl');
        let maximalkraft = document.getElementById('ergebnis');
        let gestemmtesGewichtORM = document.getElementById('gestemmtesGewichtORM');
        let prozentsatzORM = document.getElementById('prozentsatzORM');
        let prozent = calculate(wiederholungszahl.value);
        let ergebnis = gewicht.value / prozent;
        ergebnis = ergebnis.toFixed(2);
        prozent = prozent.toFixed(2);
        maximalkraft.innerHTML = ergebnis.toString() + " =";
        prozentsatzORM.innerText = prozent.toString();
        gestemmtesGewichtORM.innerText = gewicht.value.toString();

        //Liste wird geupdated
        if (array === 'empty') {
            array = [{
                timestamp: new App().timeStamp(),
                gewicht: gewicht.value.toString(),
                wiederholungszahl: wiederholungszahl.value.toString(),
                prozent: prozent.toString(),
                maximalkraft: ergebnis.toString()
            }]
        } else {
            array.push({
                timestamp: new App().timeStamp(),
                gewicht: gewicht.value.toString(),
                wiederholungszahl: wiederholungszahl.value.toString(),
                prozent: prozent.toString(),
                maximalkraft: ergebnis.toString()
            });
        }
        db.saveData('orm', array,()=>{
            console.log("Saved")
        });
    });
}
