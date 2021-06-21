// per il cambio lingua
function lang_change(language) {
let lanopen;
let lanclose;
    if(language==='it'){
        lanopen = document.getElementById("lang_it");
        lanclose = document.getElementById("lang_en");
    }
    else if (language==='en'){
        lanopen = document.getElementById("lang_en");
        lanclose = document.getElementById("lang_it");
    }
lanopen.classList.add("active");
lanclose.classList.remove("active");
}


//Transazione inizio -> login (inizia ora)
function inizia_login(){
    location.replace("login.html");
}

//Transazione login -> registrazione (registrati ora)
function start_registration(){
    location.replace("registration.html");
}

//Transazione login -> registrazione (accedi)
function start_MainGame(){
    location.replace("MainGame.html");
}

//Transazioni argomenti
function start_Argument(num){
    let pos="./Argument/Argument";
    let ending=".html";
    pos=pos.concat(num.toString());
    pos=pos.concat(ending);
    location.replace(pos);
}

// transazione parti di teoria
function start_Theory(folder,Nargument){
    let pos="./"
    pos=pos.concat(folder).concat("/").concat("Teoria").concat(Nargument).concat(".html");
    location.replace(pos);
}

//transazioni parti di pratica
function start_Exercise(folder,Nargument){
    let pos="./"
    pos=pos.concat(folder).concat("/").concat("Esercizi").concat(Nargument).concat(".html");
    location.replace(pos);
}
//transazioni parti di pratica
function congrat(){
    var txt;
    if (confirm("Congratulazioni, risposta esatta!")) {
        location.replace('../../index.html');
    } else {
        location.replace('../../MainGame.html')
    }
}