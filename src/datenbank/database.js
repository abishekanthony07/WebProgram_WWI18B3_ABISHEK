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

class Datenbank {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.db = firebase.firestore();
    }


    createUser(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((output) => {
            console.log("Registrierung erfolgreich!", output);
            output.user.sendEmailVerification();
            alert("Bitte bestätigen Sie Ihre E-Mail Adresse, um fortzufahren!");
        }).catch((error) => {
            console.log(error);
                if (error.code === "auth/email-already-in-use") {
                    alert("Dieser E-Mail Adresse ist bereits vergeben!\n" +
                        "Sie können Ihr Passwort über den entsprechenden Button zurücksetzen oder " +
                        "sich mit dem zugehörigem Passwort einloggen.");

                } else if (error.code === "auth/weak-password"){
                    alert("Passwort ist zu kurz! Es muss mindestens 6 Zeichen lang sein!")
                     } else {
                    alert(error.message);
                    alert("Registriervorgang fehlgeschlagen. Bitte versuchen Sie es erneut.");
                }
            }
        )
    }

    loginUser(email, password, failure, success) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((output) => {
            console.log("Login erfolgreich!", output);
            if (output.user.emailVerified) {
                this.userId = output.user.uid;
                this.firebase = firebase;
                this.datenbank = firebase.firestore();
                success(this);
            } else {
                alert("Bitte bestätigen Sie Ihre E-Mail Adresse, um fortzufahren!");
            }
        }).catch((error) => {
            if (error.code === "auth/wrong-password") {
                alert("Ungültiges Passwort und/oder falsche E-Mail Adresse. Zugriff verweigert!");
                // console.log(error);
            } else if (error.code === "auth/too-many-requests") {
                alert("Zu viele Fehlversuche! Böse!")
            } else if (error.code === "auth/argument-error") {
                alert("Keine E-Mail vorhanden! Bitte registrieren Sie sich!");
                // console.log(error);
            } else if (error.code === "auth/user-not-found") {
                alert("Es wurde kein Benutzer gefunden. Bitte registrieren Sie sich!")
            } else {
                alert(error.message);
            }
        })
    }

    logoutUser(success, failure){
        firebase.auth().signOut().then(()=>{
            console.log(this.datenbank.getUser);
            success();
        }, (error)=>{
            console.log(error);
            failure(error);
        });
    }

    saveData(collection, set, callback) {
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

    getData(collection, callback) {
        firebase.firestore().collection(collection).doc(this.userId).get().then(function (document) {
            if (document.exists) {
                callback(document.data().array);
            } else {
                callback('empty');
            }
        }).catch(function (error) {
            console.error("Error getting document: ", error);
        });
    }

}

export default Datenbank;