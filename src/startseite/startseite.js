import App from "../app.js";

class Startseite {
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
    }

    onShow() {
        let section = document.querySelector("#startseiteseite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        return content;
    }

    onLoad() {
        console.log('Page loaded');

        //Submit Function
    }

    onLeave(goon) {
        return true;
    }

    get title() {
        return "WiFitness";
    }
}

export default Startseite;