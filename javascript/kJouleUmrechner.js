window.addEventListener("load", ()=>{
   document.getElementById("button").addEventListener("click", rechne);
});



function rechne() {



    getData("kJoule", (array) =>{
        let kilokalorien = document.getElementById('Kcal');
        let summe  = kilokalorien.value * 4.1868;
        summe.toFixed(2);
        console.log(summe);
        document.getElementById('output').value = summe;

        if(array==='empty'){
            array = [{
                kcal:kilokalorien.value
            }]
        }else{
            array.push({
                kcal:kilokalorien.value
            });
        }
        saveData("kJoule", array);
    });
}


