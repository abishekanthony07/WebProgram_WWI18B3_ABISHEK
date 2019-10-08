window.addEventListener("load", () => {
// Your web app's Firebase configuration
    initializeDB();
    loginUser();

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
}

function createUser (){
}

let userId;
let datenbank;

function loginUser (){
    firebase.auth().signInWithEmailAndPassword("defaultbenutzer@email.de", "123456789").then((output)=>{
        console.log("Login erfolgreich!", output);
        userId = output.user.uid;
        datenbank = firebase.firestore();
    }).catch((error)=>{
        if(error.code === "auth/wrong-password"){
            alert("Ungültiges Passwort und/oder falsche E-Mail Adresse. Zugriff verweigert!");
        }else if(error.code === "auth/too-many-requests") {
            alert("Zu viele Fehlversuche! Böse!")
        }else{
            alert(error.message);
        }
        console.log(Error.message, error);

    })
}

function saveData(collection, set) {
    datenbank.collection(collection).doc(userId).set(set).then(()=>{
        console.log("Status saved!")
    }).catch((error)=>{
        console.log(error.message, error);
    });
}

function getData(collection){
    datenbank.collection(collection).doc(userId).get().then(function(document) {
        console.log("id", document.data())
    }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
}