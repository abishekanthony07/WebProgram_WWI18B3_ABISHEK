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
        //Navigation der "hier"-Buttons auf der Startseite
        let here_bmi = document.getElementById("here_BMI");
        let here_kjoule = document.getElementById("here_KCalUmrechner");
        let here_maxKraft = document.getElementById("here_Maximal");

        here_bmi.addEventListener("click", () => {
            this._app._router.navigate('/bmiRechner/');
        });
        here_maxKraft.addEventListener("click", () => {
            this._app._router.navigate('/maximalkraftRechner/');
        });
        here_kjoule.addEventListener("click", () => {
            this._app._router.navigate('/kjouleRechner/');
        });
    }

    onLeave() {
        return true;
    }

    get title() {
        return "WiFitness";
    }
}

export default Startseite;
