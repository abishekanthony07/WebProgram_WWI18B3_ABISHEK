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
    hintergrundAngleichen(ergebnis, anzeige);
    ergebnis = " " + ergebnis.bold();
    anzeige.innerHTML =" <b>Dein BMI ist: </b> &nbsp;"+ ergebnis + "<b>.</b>";
    anzeige.style.display = 'flex';
    TESTsaveData();
};

function hintergrundAngleichen(ergebnis, anzeige){
    if (ergebnis < 16){
        anzeige.style.backgroundColor = "#7c7cbc";
    }else if(ergebnis > 16 && ergebnis < 17){
        anzeige.style.backgroundColor = "#7c7cfc";
    }else if(ergebnis > 17 && ergebnis < 18.5){
        anzeige.style.backgroundColor = "#7cfcfc";
    }else if(ergebnis > 18.5 && ergebnis < 25){
        anzeige.style.backgroundColor = "#7cfc7c";
    }else if(ergebnis > 25 && ergebnis < 30){
        anzeige.style.backgroundColor = "#fcfc7c";
    }else if(ergebnis > 30 && ergebnis < 35){
        anzeige.style.backgroundColor = "#fcbb91";
    }else if(ergebnis > 35 && ergebnis < 40){
        anzeige.style.backgroundColor = "#fc9191";
    }else if(ergebnis >= 40){
        anzeige.style.backgroundColor = "#c08080";
    }
}

