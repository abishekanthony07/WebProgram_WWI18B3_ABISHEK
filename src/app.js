"use strict";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
import Navigo from "navigo/lib/navigo.js";
import OneRepetitionMaximum from "./maximalkraft/orm";
import Datenbank from "./datenbank/database";
import BmiRechner from "./bmi/bmiRechner";
import KjouleRechner from "./kjoule/kJouleUmrechner";
import Startseite from "./startseite/startseite";
import Anmeldevorgang from "./anmeldung/anmeldevorgang";
import Impressum from "./impressum/impressum"
import Chart from "chart.js";

class App {
    /**
     * Konstruktor.
     */
    constructor() {
        this._title = "WebFitness";
        this._currentView = null;
        this.db = new Datenbank();
        // Single Page Router aufsetzen
        this._router = new Navigo(null, false);
        this._currentUrl = "";
        this._navAborted = false;

        this._router.on({
            "*": () => this.showLogin(),
            "/wiFitness/": () => this.showStartseite(),
            "/kjouleRechner/": () => this.showKjoule(),
            "/bmiRechner/": () => this.showBmi(),
            "/maximalkraftRechner/": () => this.showMaximalKraftrechner(),
            "/impressum/": () => this.showImpressum(),
        }).resolve();

        this._router.notFound(() => {
            console.log("Not found");
        });

        this._router.hooks({
            after: (params) => {
                if (!this._navAborted) {
                    // Navigation durchführen, daher die neue URL merken
                    this._currentUrl = this._router.lastRouteResolved().url;
                } else {
                    // Navigation abbrechen, daher die URL in der Adresszeile
                    // auf den alten Wert der bisherigen View zurücksetzen
                    this._router.pause(true);
                    this._router.navigate(this._currentUrl);
                    this._router.pause(false);
                    this._navAborted = false;
                }
            }
        });
    }


    /**
     * Ab hier beginnt die Anwendung zu laufen.
     */
    start() {
        console.log("Die Klasse App sagt Hallo!");
        this._router.resolve();
    }

    /**Zeige einen Ladebildschirm*/
    showLoadingscreen(id) {
        let loading = document.getElementById(id);
        console.log(loading);
        loading.style.display = 'block';
    }

    /**Blende Ladebildschirm aus*/
    hideLoadingscreen(id) {
        let loading = document.getElementById(id);
        loading.style.display = 'none';
    }

    /**Zeige die Login Seite an*/
    showLogin() {
        /**Die Header müssen auf dieser Art und Weise entfernt werden,
         * damit die Menüs ned angezeigt werden.
         **/
        let auswahlMenu = document.getElementById('auswahlMenue');
        auswahlMenu.style.display = 'none';
        let imageArrow = document.getElementById('arrowDowndiv');
        imageArrow.style.display = 'none';
        let imageFooterMenu = document.getElementById("footerMenuP");
        imageFooterMenu.style.display = 'none';
        let footerMenu = document.getElementById('footerMenu');
        footerMenu.style.display = 'none';
        let view = new Anmeldevorgang(this, this.db);
        this._switchVisibleView(view);
        console.log("Anmeldung");

        //Anmelde-Button reagiert auf enter-Tastendruck
        window.addEventListener("keypress", (p) => {
            if (p.key === "Enter") {
                let email = document.getElementById('email').value;
                let password = document.getElementById('password').value;
                this.db.loginUser(
                    email,//email
                    password,//passwort
                    () => {//failure
                        alert("Anmeldevorgang fehlgeschlagen. Bitte erneut versuchen.");
                    },
                    (datenbank) => {//success
                        this.showStartseiteAndSetListener(datenbank);
                    });
            }
        });

    }

    /**
     * Nach dem Login muss diese Methode aufgerufen werden, damit die Listener für unsere Elemente
     * der Startseite gesetzt werden, und
     * die Menüs auch angezeigt werden.
     */
    showStartseiteAndSetListener(datenbank) {
        /**einblenden von unsrerem ArrowDiv*/
        let imageArrowDiv = document.getElementById('arrowDowndiv');
        imageArrowDiv.style.display = 'block';
        /**Listener für unserem Arrow*/
        let imageArrow = document.getElementById('arrowDown');
        imageArrow.addEventListener("click", animateArrow);

        /**Footer Menü wird oben mit einer Klapptafel realisiert*/
        let imageFooterMenu = document.getElementById("footerMenuP");
        imageFooterMenu.addEventListener("click", showFooterMenu);
        imageFooterMenu.style.display = 'block';

        /**HeaderMenüs-Listener*/
        let startseiteButton = document.getElementById('startseite');
        let auswahlAbi = document.getElementById('auswahlAbi');
        let auswahlSas = document.getElementById('auswahlSas');
        let auswahlhan = document.getElementById('auswahlHan');
        startseiteButton.addEventListener("click", () => {
            // this.showStartseite();
            this._router.navigate('/wiFitness/');
            console.log("startseite");
        });
        auswahlAbi.addEventListener("click", () => {
            this._router.navigate('/maximalkraftRechner/');
            // this.showMaximalKraftrechner();
            console.log("max");
        });
        auswahlSas.addEventListener("click", () => {
            // this.showBmi();
            this._router.navigate('/bmiRechner/');
            console.log("bmi");
        });
        auswahlhan.addEventListener("click", () => {
            // this.showKjoule();
            this._router.navigate('/kjouleRechner/');
            console.log("kjoule");
        });
        /**Impressum-Listener*/
        let auswahlImpressum = document.getElementById('impressum');
        auswahlImpressum.addEventListener("click", () => {
            this._router.navigate('/impressum/');
            console.log("impressum")
        });
        /**Logout-Listener*/
        let logout = document.getElementById('logout');
        logout.addEventListener("click", () => {
            this.db.logoutUser(() => {
                this._router.navigate("*");
            }, (error) => {
                alert(error.message);
            });
        });
        this._router.navigate('/wiFitness/')

        //Navigation der "hier"-Buttons auf der Startseite
        let here_bmi = document.getElementById("here_BMI");
        let here_kjoule = document.getElementById("here_KCalUmrechner");
        let here_maxKraft = document.getElementById("here_Maximal");

        here_bmi.addEventListener("click", () => {
            this._router.navigate('/bmiRechner/');
        });
        here_maxKraft.addEventListener("click", () => {
            this._router.navigate('/maximalkraftRechner/');
        });
        here_kjoule.addEventListener("click", () => {
            this._router.navigate('/kjouleRechner/');
        });
    }

    /**
     * Diese Methode zeigt die Startseite an.
     */
    showStartseite() {
        let view = new Startseite(this, this.db);
        this._switchVisibleView(view)
        console.log("startseite");
    }

    /**
     * Diese Methode zeigt den Bmi-Rechner an.
     */
    showBmi() {
        let view = new BmiRechner(this, this.db);
        this._switchVisibleView(view)
    }

    /**
     * Diese Methode zeigt den Kjoule-Rechner an.
     */
    showKjoule() {
        let view = new KjouleRechner(this, this.db);
        this._switchVisibleView(view)
    }

    /**
     * Diese Methode zeigt den MaximalKraft-Rechner an.
     */
    showMaximalKraftrechner() {
        let view = new OneRepetitionMaximum(this, this.db);
        this._switchVisibleView(view)
    }

    /**
     * Diese Methode zeigt das Impressum an.
     */
    showImpressum() {
        let view = new Impressum(this, this.db);
        this._switchVisibleView(view)
    }


    _switchVisibleContent(content) {
        let app = document.querySelector("#app");
        let main = document.querySelector("#app main");

        app.className = "";
        main.innerHTML = "";

        if (content && content.className) {
            app.className = content.className;
        }

        // Neue Inhalte des Hauptbereichs einfügen
        if (content && content.main) {
            content.main.forEach(element => {
                main.appendChild(element);
            });
        }

        // Navigo an die Links in der View binden
        this._router.updatePageLinks();
    }

    /**
     * Hole die Daten von der Datenbank und baue ein Diagramm
     * @param collection Datenbanktabellenname
     * @param savedDataDiv Div-Container vom Chart
     * @param loadingID Id vom Ladebalken-Container
     * @param chartID Id vom Chart
     * @param ueberschrift Überschrift für das Diagramm
     * @param callback (chart)
     */
    getAndSetData(collection, savedDataDiv, loadingID, chartID, ueberschrift, callback) {
        this.hideLoadingscreen(loadingID);
        this.db.getData(collection, (array) => {
            let counter;
            labels = [array.length];
            data = [array.length];
            console.log(array);
            if (array.length === 0) {
                console.log("fertig");
                savedDataDiv.innerHTML = "Sie haben keine Werte abgespeichert!";
                this.hideLoadingscreen(loadingID);
            }
            for (counter = 0; counter < array.length; counter++) {
                let element = array[counter];
                //ORM
                if (collection === 'orm') {
                    labels[counter] = element.timestamp;
                    data[counter] = element.maximalkraft;
                    //BMI
                } else if (collection === 'bmi') {
                    labels[counter] = element.timestamp;
                    data[counter] = element.ergebnis;
                    //KCal->KJoule
                } else if (collection === 'kJoule') {
                    labels[counter] = element.timestamp;
                    data[counter] = element.summekjoulekalorien;
                }
                //Verarbeite die Daten und gebe einen Chart zurück
                if (counter === array.length - 1) {
                    savedDataDiv.innerHTML = "<canvas id=\"" + chartID + "\">";
                    let myChartObject = document.getElementById(chartID);
                    console.log(myChartObject);
                    let chart = new Chart(myChartObject, {
                        type: "line",
                        data: {
                            labels: labels,
                            datasets: [{
                                label: ueberschrift,
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
                    this.hideLoadingscreen(loadingID);
                    callback();
                }
            }
        })
    };

    /**
     * Hole die Daten von der Datebank und setze die Listener für die Buttons
     * @param collection Datenbanktabellenname
     * @param editDataDiv Div-Container vom Editcontainer
     * @param loadingID Id vom Ladebalken-Container
     * @param inhalt Div-Container vom MainContent
     * @param savedDataDiv Div-Container vom Chart
     * @param callback () Zeige Div-Container vom edit in der jeweiligen Klasse
     */
    getAndSetEditData(collection, editDataDiv, loadingID, inhalt, savedDataDiv, callback) {
        this.showLoadingscreen(loadingID);
        console.log("Datenbank", this.db);
        this.db.getData(collection, (array) => {
            let index;
            arrayList = array;
            if (array.length === 0) {
                editDataDiv.innerHTML = "Sie haben keine Werte gespeichert!";
            } else {
                editDataDiv.innerHTML = "";
            }
            for (index = 0; index < array.length; index++) {
                let element = array[index];
                let newEl = document.createElement("div");
                newEl.className = "inhalt";
                //Inhalt wird gesetzt
                if (collection === "orm") {
                    newEl.innerHTML = "<div class='delete'><div class='hidden' id='index'>" + index + "</div><button id='delete'>Löschen?</button>&nbsp;<b>[" + element.timestamp + "]&nbsp;</b>Maximalkraft von&nbsp;" + element.maximalkraft + " kg</div>";
                } else if (collection === "bmi") {
                    newEl.innerHTML = "<div class='delete'><div class='hidden' id='index'>" + index + "</div><button id='delete'>Löschen?</button>&nbsp;<b>[" + element.timestamp + "]&nbsp;</b>Maximalkraft von&nbsp;" + element.ergebnis + " kg</div>";
                } else if (collection === "kJoule") {
                    newEl.innerHTML = "<div class='delete'><div class='hidden' id='index'>"+index+"</div><button id='delete'>Löschen?</button>&nbsp;<b>["+element.timestamp+"]&nbsp;</b>Maximalkraft von&nbsp;"+element.maximalkraft+" kg</div>";
                }
                newEl = editDataDiv.appendChild(newEl);
                //delete Listener wird gesetzt
                newEl.addEventListener('click', (event) => {
                    deleteElement(this.db, loadingID, collection, event, inhalt, savedDataDiv, editDataDiv, callback);
                });
            }
            this.hideLoadingscreen(loadingID);
        })
    }

    _switchVisibleView(view) {
        // Callback, mit dem die noch sichtbare View den Seitenwechsel zu einem
        // späteren Zeitpunkt fortführen kann, wenn sie in der Methode onLeave()
        // false zurückliefert. Dadurch erhält sie die Möglichkeit, den Anwender
        // zum Beispiel zu fragen, ob er ungesicherte Daten speichern will,
        // bevor er die Seite verlässt.
        let newUrl = this._router.lastRouteResolved().url;
        let goon = () => {
            // ?goon an die URL hängen, weil der Router sonst nicht weiternavigiert
            this._router.navigate(newUrl + "?goon");
        };

        // Aktuelle View fragen, ob eine neue View aufgerufen werden darf
        if (this._currentView && !this._currentView.onLeave(goon)) {
            this._navAborted = true;
            return false;
        }

        // Alles klar, aktuelle View nun wechseln
        document.title = `${this._title} – ${view.title}`;

        this._currentView = view;
        this._switchVisibleContent(view.onShow());
        view.onLoad();
        return true;
    }

    /**
     * Diese Methode erstellt einen Zeitstempel.
     * @returns {string}
     */
    static timeStamp() {
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " am " + today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
    }
}

export default App;
/**
 * Falls die Liste leer ist wird dementsprechend eine Nachricht angezeigt.
 *
 * @param db Datenbank
 * @param app App
 * @param collection Datenbanktabellenname
 * @param loadingID LadebildschirmID
 * @param event Event vom einzelnen Container eines gesopeicherten Elements
 * @param inhalt MainContent
 * @param savedDataDiv ChartDiv
 * @param editDataDiv EditDiv
 * @param callback ???
 */
let deleteElement = (db, app, collection, loadingID, event, inhalt, savedDataDiv, editDataDiv, callback) => {
    let deleteIndex = event.target.parentNode.firstChild.textContent;
    arrayList.splice(deleteIndex, 1);
    if (arrayList.length === 0) {
        editDataDiv.innerHTML = "Sie haben keine Werte gespeichert!";
    }
    db.saveData(collection, arrayList, () => {
        callback();
    });
};

let buttonsSindZusehen = false;
/**
 * Diese Methode animiert unser Pfeil zum anzeigen der 3 verschiedenen Seiten.
 */
let animateArrow = () => {
    let arrowDown = document.getElementById('arrowDown');
    let arrowDownDiv = document.getElementById('arrowDowndiv');
    let auswahlMenue = document.getElementById('auswahlMenue');

    if (!buttonsSindZusehen) {
        rotateImage(arrowDown, 'rotate(-180deg)');
        buttonsSindZusehen = true;
        //Div vom arrowDown hintergrund entfernen
        arrowDown.style.border = 'none';
        //Borderstyle vom ArrowButton ändern
        arrowDownDiv.style.background = 'none';
        arrowDown.style.borderTopLeftRadius = '50px';
        arrowDown.style.borderTopRightRadius = '50px';
        arrowDown.style.borderBottomLeftRadius = '0px';
        arrowDown.style.borderBottomRightRadius = '0px';
        //AuswahlMenu einblenden
        auswahlMenue.style.display = 'grid';
    } else {
        rotateImage(arrowDown, 'rotate(0deg)');
        buttonsSindZusehen = false;
        //Div vom arrowDown hintergrund entfernen
        arrowDownDiv.style.background = 'rgba(112,112,112,1)';
        //Borderstyle vom ArrowButton ändern
        arrowDown.style.borderTopLeftRadius = '0px';
        arrowDown.style.borderTopRightRadius = '0px';
        arrowDown.style.borderBottomLeftRadius = '50px';
        arrowDown.style.borderBottomRightRadius = '50px';
        //AuswahlMenü einblenden
        auswahlMenue.style.display = 'none';
    }
}

/**
 * Diese Methode sorgt dafür, dass ein Bild rotiert wird.
 * @param img
 * @param degree
 */
let rotateImage = (img, degree) => {
    img.style.transform = degree;
    img.style.WebkitTransitionDuration = '0.5s';
}


let menuSindZusehen = false;

/**
 *'Footer'-Menü wird eingeblendet
 */
let showFooterMenu = () => {
    let footerIcon = document.getElementById('footerMenuP');
    let footerMenue = document.getElementById('footerMenu');

    if (!menuSindZusehen) {
        rotateImage(footerIcon, 'rotate(-90deg)')
        menuSindZusehen = true;
        footerMenue.style.display = 'inline-block';
    } else {
        rotateImage(footerIcon, 'rotate(0deg)')
        menuSindZusehen = false;
        footerMenue.style.display = 'none';
    }
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
// let getAndSetData = (db, collection, callback) => {
//     db.getData('orm', (array) => {
//         let counter;
//         labels = [array.length];
//         data = [array.length];
//         console.log(array);
//         if (array.length === 0) {
//             console.log("fertig");
//             callback('empty');
//         }
//         for (counter = 0; counter < array.length; counter++) {
//             let element = array[counter];
//             if (collection === 'orm') {
//                 labels[counter] = element.timestamp;
//                 data[counter] = element.maximalkraft;
//             }else if(collection === 'bmi'){
//                 labels[counter] = element.timestamp;
//                 data[counter] = element.ergebnis;
//                 //toDO
//                 // }else if(collection === 'kJoule'){
//                 //     labels[counter] = element.timestamp;
//                 //     data[counter] = element.maximalkraft;
//             }
//             if (counter === array.length - 1) {
//                 callback(labels, data, arrayList);
//             }
//         }
//     })
// };
