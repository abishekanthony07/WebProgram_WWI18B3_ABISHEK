"use strict";
import App from "./app.js";

window.addEventListener("load", () => {
    //Anwendung starten
    let app = new App();
    app.start();
});

let anmeldeButton = () => {

}

let registerButton = () => {

}

let loginUser = () => {

}

let enterPasswordAgain = () => {

}

let createUser = () => {
    firebaseAuth.createUserWithEmailAndPassword(
        email.getText().toString();
        password.getText().toString();
    ).addOnSuccessListener((OnSuccessListeenr) (authResult) => {
        user_id = Obejcts.requireNonNull(authResult.getUser()).getUid();
        emailAdresse = authResult.getUser().getEmail();
    }).addOnFailureListener (e) => {
        progressBar.setVisibility(View.GONE);
        if(e instanceof FirebaseAuthUserCollisionException) {
            email.setError("Es existiert bereits ein Konto mit dieser Email-Adresse!");
        } else {
            console.log (e("Error", Objects.requireNonNull(e.getLocalizedMessage()))) ;
        }
    });
}

let checkEmailVerification = () => {

}