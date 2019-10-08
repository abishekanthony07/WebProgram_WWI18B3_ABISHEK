window.addEventListener("load", ()=>{
   document.getElementById("button").addEventListener("click", rechne);
});



function rechne() {
    let kilokalorien = document.getElementById('Kcal');
    let summe  = kilokalorien.value * 4.1868;
    summe.toFixed(2);
    console.log(summe);
    document.getElementById('output').value = summe;
    saveData("kCalSammlung", "1234567");
}
