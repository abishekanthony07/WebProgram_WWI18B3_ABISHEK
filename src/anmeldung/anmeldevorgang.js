let db;

class Anmeldevorgang {
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
        db = this.db;
    }

    onShow() {
        let section = document.querySelector("#anmeldevorgang").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        console.log('Page loaded');
        return content;
    }

    onLoad() {
        let loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", () => {
            this._app._router.navigate('loading');
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            this.db.loginUser(
                email,//email
                password,//passwort
                () => {//failure
                    this._app._router.navigate("*");
                    alert("Anmeldevorgang fehlgeschlagen. Bitte erneut versuchen.");
                },
                (datenbank) => {//success
                    this._app.showStartseiteAndSetListener(datenbank);
                });
        });

        let registerButton = document.getElementById("registerButton");
        registerButton.addEventListener("click", () => {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            this.db.createUser(email, password);
        });
    }

    onLeave(goon) {
        return true;
    }

    get title() {
        return "Login";
    }
}

export default Anmeldevorgang;