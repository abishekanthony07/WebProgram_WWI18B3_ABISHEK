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
        console.log('Page loaded');
        return content;
    }

    //Login, registrieren und Passwort vergessen -> EventListener wird gesetzt
    onLoad() {
        let loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", () => {
            this._app.showLoadingscreen(this.loadingID);
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            this.db.loginUser(
                email,//email
                password,//passwort
                () => {//failure
                    this._app.hideLoadingscreen(this.loadingID);
                },
                (datenbank) => {//success
                    this._app.hideLoadingscreen(this.loadingID);
                    this._app.showStartseiteAndSetListener(datenbank);
                });
        });

        let registerButton = document.getElementById("registerButton");
        registerButton.addEventListener("click", () => {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            this.db.createUser(email, password);
        });

        let forgotPassowrd = document.getElementById('forgottenPWButton');
        forgotPassowrd.addEventListener("click", () => {
            let email = document.getElementById('email').value;
            this.db.firebase.auth().sendPasswordResetEmail(email).then(() => {
                alert("Wenn die eingegeben E-Mail Adresse bei uns hinterlegt ist, bekommen Sie eine E-Mail zum Zurücksetzen des Passworts.");
            }).catch(() => {
                alert("Es ist etwas schief gelaufen. Bitte erneut ausführen.");
            });
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