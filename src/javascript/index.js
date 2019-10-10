"use strict";
import App from "../app.js";

window.addEventListener("load", () => {
    //Anwendung starten
    let app = new App();
    app.start();

    //Listener für Navigation und Arrow Button setzen
    let imageArrow = document.getElementById('arrowDown');
    imageArrow.addEventListener("click", animateArrow);
    let startseiteButton = document.getElementById('startseite');
    let auswahlAbi = document.getElementById('auswahlAbi');
    let auswahlSas = document.getElementById('auswahlSas');
    let auswahlhan = document.getElementById('auswahlHan');
    let bmi = document.getElementById('bmiRechner');
    let orm = document.getElementById('maximalKraftRechner');
    let kjoule = document.getElementById('kJouleRechner');
    let startseite = document.getElementById('startSeiteDiv');
    showStartseite(startseite,bmi, kjoule, orm);

    startseiteButton.addEventListener("click", () => {
        showStartseite(startseite,bmi, kjoule, orm);
    });
    auswahlSas.addEventListener("click", () => {
        showBmiRechner(startseite,bmi, kjoule, orm);
    });
    auswahlAbi.addEventListener("click", () => {
        showMaximalkraftRechner(startseite,bmi, kjoule, orm);
    });
    auswahlhan.addEventListener("click", () => {
        showKjouleRechner(startseite,bmi, kjoule, orm);
    });
});

function showStartseite(startseite,bmi, kjoule, orm) {
    startseite.style.display = 'block';
    orm.style.display = 'none';
    bmi.style.display = 'none';
    kjoule.style.display = 'none';
}

function showMaximalkraftRechner(startseite,bmi, kjoule, orm) {
    startseite.style.display = 'none';
    bmi.style.display = 'none';
    kjoule.style.display = 'none';
    orm.style.display = 'block';
}

function showBmiRechner(startseite,bmi, kjoule, orm) {
    startseite.style.display = 'none';
    bmi.style.display = 'block';
    kjoule.style.display = 'none';
    orm.style.display = 'none';
}

function showKjouleRechner(startseite,bmi, kjoule, orm) {
    startseite.style.display = 'none';
    bmi.style.display = 'none';
    orm.style.display = 'none';
    kjoule.style.display = 'block';
}


let buttonsSindZusehen = false;

function animateArrow() {
    let arrowDown = document.getElementById('arrowDown');
    let auswahlMenue = document.getElementById('auswahlMenue');

    if (!buttonsSindZusehen) {
        rotateImage(arrowDown, 'rotate(-180deg)');
        buttonsSindZusehen = true;
        auswahlMenue.style.display = 'inline-block';
    } else {
        rotateImage(arrowDown, 'rotate(0deg)');
        buttonsSindZusehen = false;
        auswahlMenue.style.display = 'none';
    }
}

function rotateImage(img, degree) {
    img.style.transform = degree;
    img.style.WebkitTransitionDuration = '0.5s';
}



