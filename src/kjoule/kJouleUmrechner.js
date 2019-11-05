"use strict";
import App from "../app.js";

let db;

let ablaufkJoule = (app) => {
    document.getElementById("button").addEventListener("click", () => {
        rechne();
    });
    document.getElementById("button1").addEventListener("click", () => {
        rechne1(app);
    });

};

class KjouleRechner {
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
        db = datenbank;
        this.loadingID = 'kjouleLoading';
    }

    onShow() {
        let section = document.querySelector("#kjouleSeite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        return content;
    }

    onLoad() {
        ablaufkJoule(this._app);

        //Tabs
        //Container
        let inhalt = document.getElementById("rechnertab");
        let chart = document.getElementById("savedDataKjouleDiv");
        let edit = document.getElementById("editDataKjouleDiv");

        //"gespeicherten Werte anzeigen"
        let tabChart = document.getElementById("savingButton");
        tabChart.addEventListener('click', () => {
            showSavedDataHtml(this.db, this._app, "kjouleLoading", inhalt, chart, edit);
        });
        //"Kjoule Rechner"
        let tabRechner = document.getElementById("kJouleRechnerButton");
        tabRechner.addEventListener('click', () => {
            showKjouleRechnerHtml(inhalt, chart, edit);
        });
        //"gespeicherten Werte bearbeiten"
        let tabEdit = document.getElementById("editierenDataButton");
        tabEdit.addEventListener('click', () => {
            showEditDataHtml(this.db, this._app, "kjouleLoading", inhalt, chart, edit);
        });
        showKjouleRechnerHtml(inhalt, chart, edit);

    }

    onLeave(goon) {
        return true;
    }

    get title() {
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
    app.getAndSetData('kJoule', savedDataDiv, "kjouleLoading", "myChartKjoule", "Umrechnung kjoule in kcal Ergebnisse", () => {

    });
};
let showEditDataHtml = (db, app, loadingID, inhalt, savedDataDiv, editDataDiv) => {
    inhalt.style.display = 'none';
    savedDataDiv.style.display = 'none';
    editDataDiv.style.display = 'block';
    app.getAndSetEditDataFirebase("kJoule", editDataDiv, "kjouleLoading", inhalt, savedDataDiv, () => {
    },
        ()=> {
         showEditDataHtml(db, app, loadingID, inhalt, savedDataDiv, editDataDiv);
        })
};

let rechne1 = (app) => {
    app.showLoadingscreen("kjouleLoading");
    db.getData("kJoule", (array) => {
        let kjoulekalorien = document.getElementById('KJOULE');
        let summekjoulekalorien = kjoulekalorien.value / 4.184;
        summekjoulekalorien = summekjoulekalorien.toFixed(2);
        document.getElementById('output1').value = summekjoulekalorien;
        if (array === 'empty') {
            array = [{
                kjoule: kjoulekalorien.value,
                summekjoulekalorien: summekjoulekalorien,
            }]
        } else {
            array.push({
                kjoule: kjoulekalorien.value,
                summekjoulekalorien: summekjoulekalorien,
                timestamp: App.timeStamp(),
            });
        }
        db.saveData("kJoule", array, () => {
            app.hideLoadingscreen("kjouleLoading");
        });
    });
};

let rechne = () => {
    db.getData("Kcal", (array) => {
        let kilokalorien = document.getElementById('Kcal');
        let summekilokalorien = kilokalorien.value * 4.1868;
        summekilokalorien = summekilokalorien.toFixed(2);
        document.getElementById('output').value = summekilokalorien;

        if (array === 'empty') {
            array = [{
                kcal: kilokalorien.value,
                summekikalorien: summekilokalorien,
                timestamp: App.timeStamp(),
            }]
        } else {
            array.push({
                kcal: kilokalorien.value,
                summekikalorien: summekilokalorien,
                timestamp: App.timeStamp(),
            });
        }
        db.saveData("Kcal", array, () => {
        });
    });
};