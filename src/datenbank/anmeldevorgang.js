import * as firebase from "firebase";

window.addEventListener('load', () => {
    let emailAgainSend;
    emailAgainSend = document.getElementById("emailErneutVersenden");
        emailAgainSend.addEventListener("click", () => {
        firebase.auth().currentUser.sendEmailVerification();
    });


     let loginButton ="";
     loginButton.addEventListener("click", () => {
         db.loginUser(
             "",//email
             "",//passwort
             ()=>{//failure

             },
             ()=>{//success

             });
     });
});

class Anmeldevorgang {

    onShow() {
        let section = document.querySelector("#ormSeite").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        console.log('Page loaded');

        //Submit Function

        return content;
    }

    onLoad() {

    }

    onLeave(goon) {
        return true;
    }

    get title() {
        return "Login";
    }
}
export default Anmeldevorgang;