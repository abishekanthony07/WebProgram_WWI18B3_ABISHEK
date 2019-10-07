document.getElementById("test").addEventListener("input", rechne);

function rechne() {
    let kilokalorien = document.getElementById('Kcal');
    let summe  = kilokalorien.valueAsNumber * 4.1868;
    document.getElementById('output').value = summe;
}
