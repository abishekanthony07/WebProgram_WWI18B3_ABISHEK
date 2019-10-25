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

class App {
    /**
     * Konstruktor.
     */
    constructor() {
        this._title = "WiFitness";
        this._currentView = null;

        // Single Page Router aufsetzen
        this._router = new Navigo(null, false);
        this._currentUrl = "";
        this._navAborted = false;
        this.db = new Datenbank();

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

    showLogin() {
        /**Die Header müssen auf dieser Art und Weise entfernt werden,
         * damit die Menüs ned angezeigt werden.
        **/
        let imageArrow = document.getElementById('arrowDowndiv');
        imageArrow.style.display = 'none';
        let imageFooterMenu = document.getElementById("footerMenuP");
        imageFooterMenu.style.display = 'none';
        let footerMenu = document.getElementById('footerMenu');
        footerMenu.style.display = 'none';

        let view = new Anmeldevorgang(this, this.db);
        this._switchVisibleView(view);
        console.log("Anmeldung");

        let anmeldung = document.getElementById("loginButton");
        window.addEventListener("keypress", (p) => {
            if (p.key === "Enter") {
                this.showStartseiteAndSetListener();
            }
        });
    }

    /**
     * Nach dem Login muss diese Methode aufgerufen werden, damit die Listener für unsere Elemente
     * der Startseite gesetzt werden, und
     * die Menüs auch angezeigt werden.
     */
    showStartseiteAndSetListener(datenbank) {
        this.db = datenbank;
        /**einblenden von unsrerem Arrow*/
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
            this._router.navigate('*');
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
        logout.addEventListener("click", ()=>{
            this.db.logoutUser(()=>{
                this._router.navigate("*");
            },(error)=>{
                alert(error.message);
            });
        });
        this._router.navigate('/wiFitness/')

        //Navigation der "hier"-Buttons auf der Startseite
        let here_bmi = document.getElementById("here_BMI");
        let here_kjoule = document.getElementById("here_KCalUmrechner");
        let here_maxKraft = document.getElementById("here_Maximal");

        here_bmi.addEventListener("click", ()=>{
            this._router.navigate('/bmiRechner/');
        });
        here_maxKraft.addEventListener("click", ()=>{
            this._router.navigate('/maximalkraftRechner/');
        });
        here_kjoule.addEventListener("click", ()=>{
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
        }

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
    timeStamp() {
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " am " + today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
    }
}

export default App;


let buttonsSindZusehen = false;

/**
 * Diese Methode animiert unser Pfeil zum anzeigen der 3 verschiedenen Seiten.
 */
function animateArrow() {
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
        auswahlMenue.style.display = 'inline-block';
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
function rotateImage(img, degree) {
    img.style.transform = degree;
    img.style.WebkitTransitionDuration = '0.5s';
}


let menuSindZusehen = false;

/**
 *'Footer'-Menü wird eingeblendet
 */
function showFooterMenu() {
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
}
