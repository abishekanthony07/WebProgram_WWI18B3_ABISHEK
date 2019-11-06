let db;

class Anmeldevorgang {
    //Konstruktor für den Anmeldevorgang
    //LadebildschirmcontainerID wird gesetzt
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
        db = this.db;
        this.loadingID = 'anmeldeLoading';
    }

    onShow() {
        this.section = document.querySelector("#anmeldevorgang").cloneNode(true);
        let content = {
            className: "visible",
            main: this.section.querySelectorAll("main > *"),
        };
        return content;
    }

    //Login, registrieren und Passwort vergessen -> EventListener wird gesetzt
    onLoad() {
        let loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", () => {
            let email = document.getElementById('email');
            let password = document.getElementById('password');
            if (email.checkValidity() && password.checkValidity()) {
                this._app.showLoadingscreen(this.loadingID);
                this.db.loginUser(
                    email.value,//email
                    password.value,//passwort
                    () => {//failure
                        this._app.hideLoadingscreen(this.loadingID);
                    },
                    (datenbank) => {//success
                        this._app.hideLoadingscreen(this.loadingID);
                        this._app.showStartseiteAndSetListener(datenbank);
                    });
            }
        });

        let registerButton = document.getElementById("registerButton");
        registerButton.addEventListener("click", () => {
            let email = document.getElementById('email');
            let password = document.getElementById('password');
            if (email.checkValidity() && password.checkValidity()) {
                this.db.createUser(email.value, password.value);
            }
        });

        let forgotPassowrd = document.getElementById('forgottenPWButton');
        forgotPassowrd.addEventListener("click", () => {
            let email = document.getElementById('email');
            if (email.checkValidity()) {
                this.db.firebase.auth().sendPasswordResetEmail(email.value).then(() => {
                    alert("Wenn die eingegeben E-Mail Adresse bei uns hinterlegt ist, bekommen Sie eine E-Mail zum Zurücksetzen des Passworts.");
                }).catch(() => {
                    alert("Es ist etwas schief gelaufen. Bitte erneut ausführen.");
                });
            }
        });
    }

    onLeave() {
        return true;
    }

    get title() {
        return "Login";
    }
}

export default Anmeldevorgang;