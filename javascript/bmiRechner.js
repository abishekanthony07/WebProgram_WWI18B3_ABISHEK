window.addEventListener("load", () => {
    let buttonBerechen = document.getElementById('berechnenButton');
    buttonBerechen.addEventListener("click", () => {
        bmiBerechnen();
    });
    window.addEventListener("keypress", (p) => {
        if (p.key == "Enter") {
            bmiBerechnen();
        }
    });
});

function bmiBerechnen() {
    let eingabeGroesse = document.getElementById("groesse").value;
    let eingabeGewicht = document.getElementById("masse").value;
    let ergebnis = eingabeGewicht / Math.pow(eingabeGroesse / 100, 2);
    let anzeige = document.getElementById("ausgabe");
    ergebnis=ergebnis.toFixed(2);
    anzeige.innerHTML = "Dein BMI ist: " + ergebnis + ".";
    anzeige.style.display = 'flex';
};

