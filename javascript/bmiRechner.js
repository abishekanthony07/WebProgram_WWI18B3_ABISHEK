window.addEventListener("load", ()=>{
    bmiBerechnen();
});

function bmiBerechnen() {
    let buttonBerechen = document.getElementById('berechnenButton');
    let eingabeGroesse = document.getElementById("groesse").value;
    let eingabeGewicht = document.getElementById("masse").value;
    buttonBerechen.addEventListener("click", () => {
            let ergebnis = eingabeGewicht / Math.pow(eingabeGroesse/100, 2);

        }
    )
};


// let berechnenButton;
//
// berechnenButton.addEventListener(bmiBerechnen(eingabeGewicht, eingabeGroesse));
//
//
// console.log(eingabeGewicht);
// console.log(eingabeGroesse);

