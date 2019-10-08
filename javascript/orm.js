window.addEventListener('load', ()=>{
    let berechneButton = document.getElementById('berechneButton');
    berechneButton.addEventListener('click', berechne);
});
function berechne() {
    let gewicht = document.getElementById('gewicht');
    let wiederholungszahl = document.getElementById('wiederholungszahl');
    let maximalkraft = document.getElementById('ergebnis');
    let gestemmtesGewichtORM = document.getElementById('gestemmtesGewichtORM');
    let prozentsatzORM = document.getElementById('prozentsatzORM');
    let prozent = calculate(wiederholungszahl.value);
    let ergebnis = gewicht.value / prozent;
    maximalkraft.innerHTML = ergebnis.toString() + " =";
    prozentsatzORM.innerText = prozent.toString();
    gestemmtesGewichtORM.innerText = gewicht.value.toString();
    saveData('orm', {
        timestamp: timeStamp(),
        gewicht: gewicht.value.toString(),
        wiederholungszahl: wiederholungszahl.value.toString(),
        prozent: prozent.toString(),
        maximalkraft: ergebnis.toString()
    });
    getData('orm');
}

/*Berechne den Prozentsatz für die bestimmte Wiederholungszahl*/
function calculate(wiederholungszahl) {
    if (wiederholungszahl > 30) {
        if (wiederholungszahl >= 40) {
            return 0.3;
        } else {
            return rechne(wiederholungszahl, 40, 30, 0.3, 0.4);
        }
    } else if (wiederholungszahl > 25) {
        if (wiederholungszahl === 30) {
            return 0.4;
        } else {
            return rechne(wiederholungszahl, 30, 25, 0.4, 0.5);
        }
    } else if (wiederholungszahl > 15) {
        if (wiederholungszahl === 25) {
            return 0.5;
        } else {
            return rechne(wiederholungszahl, 25, 15, 0.5, 0.6);
        }
    } else if (wiederholungszahl > 12) {
        if (wiederholungszahl === 15) {
            return 0.6;
        } else {
            return rechne(wiederholungszahl, 15, 12, 0.6, 0.7);
        }
    } else if (wiederholungszahl > 8) {
        if (wiederholungszahl === 12) {
            return 0.7;
        } else {
            return rechne(wiederholungszahl, 12, 8, 0.7, 0.8);
        }
    } else if (wiederholungszahl > 4) {
        if (wiederholungszahl === 8) {
            return 0.8;
        } else {
            return rechne(wiederholungszahl, 8, 4, 0.8, 0.9);
        }
    } else if (wiederholungszahl > 1) {
        if (wiederholungszahl === 4) {
            return 0.9;
        } else {
            return rechne(wiederholungszahl, 4, 2, 0.9, 1);
        }
    } else {
        return 1.0;
    }
}

/*Diese Methode berechnet anhand der oberen, unteren Grenze von den Wiederholungen 
und vom Prozentsatz den jeweiligen Prozentsatz*/
function rechne(wiederholungszahl, wiederholungOben, wiederholungUnten, prozentUnten, prozentOben) {
    let teiler = wiederholungOben - wiederholungUnten;
    let differenzW = wiederholungszahl - wiederholungUnten;
    let differenzP = prozentOben - prozentUnten;
    let geteilt = differenzP / teiler;
    return geteilt * differenzW + prozentUnten;
}