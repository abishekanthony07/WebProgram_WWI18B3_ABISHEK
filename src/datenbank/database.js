"use strict";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import app from "../app";

const firebaseConfig = {
    apiKey: "AIzaSyDfiAtnO_l-I5ZxF3BvlY0Hctt8uPXwV7k",
    authDomain: "webfitness-c165a.firebaseapp.com",
    databaseURL: "https://webfitness-c165a.firebaseio.com",
    projectId: "webfitness-c165a",
    storageBucket: "webfitness-c165a.appspot.com",
    messagingSenderId: "758423002310",
    appId: "1:758423002310:web:2fb945bc56ca20cdf90bc7",
    measurementId: "G-TNEMX97BZS"
};

let db = "";

class Datenbank {
    constructor(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        this.loginUser();
    }
    // createUser (){
    //     firebaseAuth.createUserWithEmailAndPassword(
    //         email.getText().toString();
    //     password.getText().toString();
    // ).addOnSuccessListener((OnSuccessListeenr) (authResult) => {
    //         user_id = Obejcts.requireNonNull(authResult.getUser()).getUid();
    //         emailAdresse = authResult.getUser().getEmail();
    //     }).addOnFailureListener (e) => {
    //         progressBar.setVisibility(View.GONE);
    //         if(e instanceof FirebaseAuthUserCollisionException) {
    //             email.setError("Es existiert bereits ein Konto mit dieser Email-Adresse!");
    //         } else {
    //             console.log (e("Error", Objects.requireNonNull(e.getLocalizedMessage()))) ;
    //         }
    //     }
    // }



    loginUser (email, password, failure, success){
        if(!firebase.auth().currentUser.emailVerified){
            alert("E-Mail-Adresse bestätigen!" + "Bitte bestätigen Sie Ihre E-Mail Adresse und melden Sie sich an.");
            failure();
        }else {
            success();
        }

        firebase.auth().signInWithEmailAndPassword(email, password).then((output) => {
            console.log("Login erfolgreich!", output);
            this.userId = output.user.uid;
            this.datenbank = firebase.firestore();
        }).catch((error) => {
            if (error.code === "auth/wrong-password") {
                alert("Ungültiges Passwort und/oder falsche E-Mail Adresse. Zugriff verweigert!");
            } else if (error.code === "auth/too-many-requests") {
                alert("Zu viele Fehlversuche! Böse!")
            } else {
                alert(error.message);
            }
            console.log(Error.message, error);
        })
    }
    saveData (collection, set, callback){
        console.log("Bin drin", set);
        firebase.firestore().collection(collection).doc(this.userId).set({
            array: set
        }).then(() => {
            console.log("Status saved!");
            callback;
        }).catch((error) => {
            console.log(error.message, error);
        });
    }

    getData(collection, callback){
        firebase.firestore().collection(collection).doc(this.userId).get().then(function(document) {
            if (document.exists){
                callback(document.data().array);
            }else{
                callback('empty');
            }
        }).catch(function(error) {
            console.error("Error getting document: ", error);
        });
    }

}
export default Datenbank;

// module.exports = {
//     initializeDB: function () {
//         let firebaseConfig = {
//             apiKey: "AIzaSyDfiAtnO_l-I5ZxF3BvlY0Hctt8uPXwV7k",
//             authDomain: "webfitness-c165a.firebaseapp.com",
//             databaseURL: "https://webfitness-c165a.firebaseio.com",
//             projectId: "webfitness-c165a",
//             storageBucket: "webfitness-c165a.appspot.com",
//             messagingSenderId: "758423002310",
//             appId: "1:758423002310:web:2fb945bc56ca20cdf90bc7",
//             measurementId: "G-TNEMX97BZS"
//         };
//         firebase.initializeApp(firebaseConfig);
//     },
//     createUser: function () {
//
//     },
//     loginUser: function () {
//         firebase.auth().signInWithEmailAndPassword("defaultbenutzer@email.de", "123456789").then((output) => {
//             console.log("Login erfolgreich!", output);
//             this.userId = output.user.uid;
//             this.datenbank = firebase.firestore();
//         }).catch((error) => {
//             if (error.code === "auth/wrong-password") {
//                 alert("Ungültiges Passwort und/oder falsche E-Mail Adresse. Zugriff verweigert!");
//             } else if (error.code === "auth/too-many-requests") {
//                 alert("Zu viele Fehlversuche! Böse!")
//             } else {
//                 alert(error.message);
//             }
//             console.log(Error.message, error);
//         })
//     }, /**
//      * Diese Methode speichert die neue Liste in der Datenbank!
//      * @param collection
//      * @param set (Das neue Array)
//      * @param callback
//      */
//     saveData: function (collection, set, callback) {
//         this.datenbank.collection(collection).doc(this.userId).set({
//             array: set
//         }).then(() => {
//             console.log("Status saved!")
//             callback;
//         }).catch((error) => {
//             console.log(error.message, error);
//         });
//     },
//     /**
//      * Diese Methode holt sich die Liste mit den abgesicherten Daten.
//      * @param collection (bmi, kJoule, orm)
//      * @param callback (liste als array) WICHTIG: key von der neuen Dictionary ist array!!!
//      */
//     getData: function(collection, callback){
//         this.datenbank.collection(collection).doc(this.userId).get().then(function(document) {
//             if (document.exists){
//                 callback(document.data().array);
//             }else{
//                 callback('empty');
//             }
//
//         }).catch(function(error) {
//             console.error("Error getting document: ", error);
//         });
//     }
// }