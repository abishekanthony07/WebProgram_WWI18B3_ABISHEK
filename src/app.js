"use strict";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
import Navigo from "navigo/lib/navigo.js";
import OneRepetitionMaximum from "./maximalkraft/orm";
import Datenbank from "./datenbank/database";
class App {
    /**
     * Konstruktor.
     */
    constructor() {
        this._title = "WiFitness";
        this._currentView = null;

        // Single Page Router aufsetzen
        this._router = new Navigo();
        this._currentUrl = "";
        this._navAborted = false;
        this.db = new Datenbank();

        this._router.on({
            // "*":                       () => this.showSongOverview(),
            // "/song/new/":              () => this.showSongDisplayEdit("", "new"),
            // "/song/display/:id/":  params => this.showSongDisplayEdit(params.id, "display"),
            // "/song/edit/:id/":     params => this.showSongDisplayEdit(params.id, "edit"),
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
        // this._router.resolve();
        this.showMaximalKraftrechner();
    }

    showStartseite(){
        let view = new OneRepetitionMaximum(this);
        this._switchVisibleView(view)
    }
    showBmi(){
        let view = new OneRepetitionMaximum(this);
        this._switchVisibleView(view)
    }
    showKjoule(){
        let view = new OneRepetitionMaximum(this);
        this._switchVisibleView(view)
    }

    showMaximalKraftrechner(){
        let view = new OneRepetitionMaximum(this);
        this._switchVisibleView(view)
    }


    _switchVisibleContent(content){
        let app = document.querySelector("#app");
        let header = document.querySelector("#app > header");
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
    }

    _switchVisibleView(view) {
        // Callback, mit dem die noch sichtbare View den Seitenwechsel zu einem
        // späteren Zeitpunkt fortführen kann, wenn sie in der Methode onLeave()
        // false zurückliefert. Dadurch erhält sie die Möglichkeit, den Anwender
        // zum Beispiel zu fragen, ob er ungesicherte Daten speichern will,
        // bevor er die Seite verlässt.
        let goon = () => this._switchVisibleView(view);

        // Aktuelle View fragen, ob eine neue View aufgerufen werden darf
        if (this._currentView && !this._currentView.onLeave(goon)) {
            return false;
        }

        // Alles klar, aktuelle View nun wechseln
        document.title = `${this._title} – ${view.title}`;

        this._currentView = view;
        this._switchVisibleContent(view.onShow());
        return true;
    }

    timeStamp() {
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " am " + today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
    }
}
export default App;