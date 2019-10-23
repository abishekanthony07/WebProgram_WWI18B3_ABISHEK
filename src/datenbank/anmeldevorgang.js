import * as firebase from "firebase";

let db;

class Anmeldevorgang {
    constructor(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.db = firebase.firestore();
    }

    onShow() {
        let section = document.querySelector("#anmeldevorgang").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        console.log('Page loaded');

        //Submit Function

        return content;
    }

    onLoad() {
        let emailAgainSend;
        emailAgainSend = document.getElementById("emailErneutVersenden");
        emailAgainSend.addEventListener("click", () => {
            firebase.auth().currentUser.sendEmailVerification();
        });


        let loginButton = document.getElementById("loginButton");
        loginButton.addEventListener("click", () => {
            this.db.loginUser(
                "",//email
                "",//passwort
                ()=>{//failure
                    alert("Anmeldevorgang fehlgeschlagen. Bitte erneut versuchen.");
                },
                ()=>{//success
                    alert("Sie sind nun eingeloggt als " + db.username );
                });
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