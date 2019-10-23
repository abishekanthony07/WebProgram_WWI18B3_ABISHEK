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
            "*":                       () => this.showStartseite(),
            "/kjouleRechner/":              () => this.showKjoule(),
            "/bmiRechner/":  () => this.showBmi(),
            "/maximalkraftRechner/":     () => this.showMaximalKraftrechner(),
        }).resolve();

        this._router.notFound(()=>{
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
        let imageArrow = document.getElementById('arrowDown');
        imageArrow.addEventListener("click", animateArrow);
        /**Footer Menü wird oben mit einer Klapptafel realisiert*/
        let imageFooterMenu = document.getElementById("footerMenuP");
        imageFooterMenu.addEventListener("click", showFooterMenu);

        let startseiteButton = document.getElementById('startseite');
        let auswahlAbi = document.getElementById('auswahlAbi');
        let auswahlSas = document.getElementById('auswahlSas');
        let auswahlhan = document.getElementById('auswahlHan');

        startseiteButton.addEventListener("click",()=>{
            // this.showStartseite();
            this._router.navigate('*');
            console.log("startseite");
        });
        auswahlAbi.addEventListener("click",()=>{
            this._router.navigate('/maximalkraftRechner/');
            // this.showMaximalKraftrechner();
            console.log("max");
        });
        auswahlSas.addEventListener("click",()=>{
            // this.showBmi();
            this._router.navigate('/bmiRechner/');
            console.log("bmi");
        });
        auswahlhan.addEventListener("click",()=>{
            // this.showKjoule();
            this._router.navigate('/kjouleRechner/');
            console.log("kjoule");
        });
        // this.showStartseite();
        this._router.navigate('*');
    }

    showStartseite(){
        let view = new Startseite(this, this.db);
        this._switchVisibleView(view)
        console.log("startseite");
    }
    showBmi(){
        let view = new BmiRechner(this, this.db);
        this._switchVisibleView(view)
    }
    showKjoule(){
        let view = new KjouleRechner(this, this.db);
        this._switchVisibleView(view)
    }

    showMaximalKraftrechner(){
        let view = new OneRepetitionMaximum(this, this.db);
        this._switchVisibleView(view)
    }


    _switchVisibleContent(content){
        let app = document.querySelector("#app");
        let main = document.querySelector("#app main");

        app.className = "";
        main.innerHTML = "";

        if (content && content.className){
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

    timeStamp() {
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " am " + today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
    }
}
export default App;


let buttonsSindZusehen = false;

function animateArrow() {
    let arrowDown = document.getElementById('arrowDown');
    let auswahlMenue = document.getElementById('auswahlMenue');

    if (!buttonsSindZusehen) {
        rotateImage(arrowDown, 'rotate(-180deg)');
        buttonsSindZusehen = true;
        auswahlMenue.style.display = 'inline-block';
    } else {
        rotateImage(arrowDown, 'rotate(0deg)');
        buttonsSindZusehen = false;
        auswahlMenue.style.display = 'none';
    }
}

function rotateImage(img, degree) {
    img.style.transform = degree;
    img.style.WebkitTransitionDuration = '0.5s';
}
/**Footer-Menü wird eingeblendet*/
let menuSindZusehen = false;

function showFooterMenu() {
    let footerIcon = document.getElementById('footerMenuP');
    let footerMenue = document.getElementById('footerMenu');

    if (!menuSindZusehen){
        menuSindZusehen = true;
        footerMenue.style.display = 'inline-block';
    }else{
        menuSindZusehen = false;
        footerMenue.style.display = 'none';
    }
}