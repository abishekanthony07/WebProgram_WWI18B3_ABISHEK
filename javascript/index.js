let startseite;
let auswahlAbi;
let auswahlSas;
let auswahlhan;
window.addEventListener("load", () => {
    let imageArrow = document.getElementById('arrowDown');
    imageArrow.addEventListener("click", animateArrow);
    startseite = document.getElementById('startseite');
    auswahlAbi = document.getElementById('auswahlAbi');
    auswahlSas = document.getElementById('auswahlSas');
    auswahlhan = document.getElementById('auswahlhan');
    showStartseite();

    startseite.addEventListener("click", () => {
        showStartseite();
    });
    auswahlSas.addEventListener("click", () => {
        showBmiRechner();
    });
    auswahlAbi.addEventListener("click", () => {
        showMaximalkraftRechner();
    });
    auswahlhan.addEventListener("click", () => {
        showKjouleRechner();
    });
});

function showStartseite() {
    console.log("test");
    startseite.style.display = 'block';
    auswahlAbi.style.display = 'none';
    auswahlSas.style.display = 'none';
    auswahlhan.style.display = 'none';
}

function showMaximalkraftRechner() {
    startseite.style.display = 'none';
    auswahlAbi.style.display = 'block';
    auswahlSas.style.display = 'none';
    auswahlhan.style.display = 'none';
}

function showBmiRechner() {
    startseite.style.display = 'none';
    auswahlAbi.style.display = 'none';
    auswahlSas.style.display = 'block';
    auswahlhan.style.display = 'none';
}

function showKjouleRechner() {
    startseite.style.display = 'none';
    auswahlAbi.style.display = 'none';
    auswahlSas.style.display = 'none';
    auswahlhan.style.display = 'block';
}


let buttonsSindZusehen = false;

function timeStamp() {
    let today = new Date();
    return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " am " + today.getDate() + "." + today.getMonth() + "." + today.getFullYear();
}

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



