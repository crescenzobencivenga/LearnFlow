function carica(){

    assign_page_2();

    $.getJSON("es1.json", function(data) {
        var i = 1;
        console.log(data.esercizi[0].esercizio1[2])
    $.each(data.esercizi[0].esercizio1[2].risposte, function(key,value){
        var el = document.createElement("h5")
        el.className = "my-auto"
        var id_elemento = "option"
        id_elemento = id_elemento.concat(i)
        i = i+1
        var t = document.createTextNode(value)
        var element = document.getElementById(id_elemento);
        el.appendChild(t)
        element.append(el);
    });
});
}


function controlla(){
    $.getJSON("es1.json", function(data) {
        var corr = data.esercizi[0].esercizio1[3].corretta
        var fl = false
        for(var i = 0 ;i<4;i++){
            var id_elem = "radio"
            var a = i+1
            id_elem = id_elem.concat(a)
            if(document.getElementById(id_elem).checked == true){
                if(a==corr)
                fl = true
                break
            }
        }
        if(fl){
            alert("brav")
        }else{
            alert("strunz")
        }
    });
}



