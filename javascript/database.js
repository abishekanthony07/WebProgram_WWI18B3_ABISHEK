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
}