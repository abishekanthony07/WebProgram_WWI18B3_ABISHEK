window.addEventListener("load", () => {
// Your web app's Firebase configuration
    initializeDB();

    });
function initializeDB() {
    let firebaseConfig = {
        apiKey: "AIzaSyDfiAtnO_l-I5ZxF3BvlY0Hctt8uPXwV7k",
        authDomain: "webfitness-c165a.firebaseapp.com",
        databaseURL: "https://webfitness-c165a.firebaseio.com",
        projectId: "webfitness-c165a",
        storageBucket: "webfitness-c165a.appspot.com",
        messagingSenderId: "758423002310",
        appId: "1:758423002310:web:2fb945bc56ca20cdf90bc7",
        measurementId: "G-TNEMX97BZS"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}
//----------------------------------------------------------------------------------------
    let db;
    function createCollection() {
        db = firebase.firestore();

// Collection erzeugt und zu "users" gepackt
        db.collection("users").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

//weitere Collection
        db.collection("users").add({
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

//Daten auslesen
    function getUsers() {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    }
