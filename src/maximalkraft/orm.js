import App from "../app.js";
let db;

class OneRepetitionMaximum{
    constructor(app, datenbank){
        this._app = app;
        this.db = datenbank;
        db = this.db;
    }

    onShow(){
        let section = document.querySelector("#ormSeite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        console.log('Page loaded');

        //Submit Function

        return content;
    }

    onLoad(){
        // window.addEventListener('load', ()=>{
        let berechneButton = document.querySelector('#berechnenButton');
        berechneButton.addEventListener('click', ()=>{
            berechne(db);
            alert("Message")
        });
        //wenn enter geklickt wird, wird die Berechnung ausgelöst
        window.addEventListener("keypress",(event)=>{
            if (event.key == "Enter") {
                event.preventDefault();
                berechne(db);
            }
        });
//getAllImportantDivs
        let inhalt = document.getElementById('inhaltORMDiv');
        let savedDataDiv = document.getElementById('savedDataDiv');
        let editDataDiv = document.getElementById('editDataDiv');
//tabButtons
        let savedData = document.getElementById('savedDataButton');
        savedData.addEventListener('click', () => {
            showSavedDataHtml(db,inhalt, savedDataDiv, editDataDiv)
        });

        let ormRechner = document.getElementById('ormRechnerButton');
        ormRechner.addEventListener('click', () => {
            showOrmRechnerHtml(inhalt, savedDataDiv, editDataDiv)
        });

        let editData = document.getElementById('editDataButton');
        editData.addEventListener('click', () => {
            showEditDataHtml(this.db, inhalt, savedDataDiv, editDataDiv)
        });
    }


    onLeave(goon){
        return true;
    }

    get title(){
        return "Maximalkraft Rechner";
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

/**
 * Diese Methode zeigt die Startseite von der Maximalkraft an.
 */
let showOrmRechnerHtml = (inhalt, savedDataDiv, editDataDiv) =>{
    inhalt.style.display = 'block';
    savedDataDiv.style.display = 'none';
    editDataDiv.style.display = 'none';
}

/**
 * Diese Methode zeigt alle gespeicherten Werte im Editiermodus an.
 */
let showEditDataHtml = (db, inhalt, savedDataDiv, editDataDiv) =>{
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'none';
    editDataDiv.style.display = 'block';
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
            //nothing
        });
    });
}

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
    db.getData('orm', (array)=>{
        let counter;
        labels = [array.length];
        data = [array.length];
        for ( counter = 0; counter<array.length; counter++){
            let element = array[counter];
            labels[counter] = element.timestamp;
            data[counter] = element.maximalkraft;
            if (counter === array.length - 1) {
                callback();
            }
        }
    })
}

/**
 * Berechne den Prozentsatz für die bestimmte Wiederholungszahl
 */
let calculate = (wiederholungszahl)=> {
    if (wiederholungszahl > 30) {
        if (wiederholunnrichgszahl >= 40) {
            return 0.3;
        } else {
            return rechne(wiederholungszahl, 40, 30, 0.3, 0.4);
        }
    } else if (wiederholungszahl > 25) {
        if (wiederholungszahl === 30) {
            return 0.4;
        } else {
            return rechne(wiederholungszahl, 30, 25, 0.4, 0.5);
        }
    } else if (wiederholungszahl > 15) {
        if (wiederholungszahl === 25) {
            return 0.5;
        } else {
            return rechne(wiederholungszahl, 25, 15, 0.5, 0.6);
        }
    } else if (wiederholungszahl > 12) {
        if (wiederholungszahl === 15) {
            return 0.6;
        } else {
            return rechne(wiederholungszahl, 15, 12, 0.6, 0.7);
        }
    } else if (wiederholungszahl > 8) {
        if (wiederholungszahl === 12) {
            return 0.7;
        } else {
            return rechne(wiederholungszahl, 12, 8, 0.7, 0.8);
        }
    } else if (wiederholungszahl > 4) {
        if (wiederholungszahl === 8) {
            return 0.8;
        } else {
            return rechne(wiederholungszahl, 8, 4, 0.8, 0.9);
        }
    } else if (wiederholungszahl > 1) {
        if (wiederholungszahl === 4) {
            return 0.9;
        } else {
            return rechne(wiederholungszahl, 4, 2, 0.9, 1);
        }
    } else {
        return 1.0;
    }
}

/**
 * Diese Methode berechnet anhand der oberen, unteren Grenze von den Wiederholungen
 * und vom Prozentsatz den jeweiligen Prozentsatz
 */
let rechne =(wiederholungszahl, wiederholungOben, wiederholungUnten, prozentUnten, prozentOben)=> {
    let teiler = wiederholungOben - wiederholungUnten;
    let differenzW = wiederholungszahl - wiederholungUnten;
    let differenzP = prozentOben - prozentUnten;
    let geteilt = differenzP / teiler;
    return geteilt * differenzW + prozentUnten;
}
export default OneRepetitionMaximum;