window.addEventListener("load", () => {
    bmiBerechnen();
});

function bmiBerechnen() {
    let buttonBerechen = document.getElementById('berechnenButton');
    buttonBerechen.addEventListener("click", () => {
            let eingabeGroesse = document.getElementById("groesse").value;
            let eingabeGewicht = document.getElementById("masse").value;
            let ergebnis = eingabeGewicht / Math.pow(eingabeGroesse / 100, 2);
            let anzeige = document.getElementById("ausgabe").innerText = "" + ergebnis;

        }
    )
};

function gleichsetzen() {

}


