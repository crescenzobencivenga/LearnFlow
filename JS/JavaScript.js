// per il cambio lingua
function googleTranslateElementInit() {
    new google.translate.TranslateElement
    (
        {
            pageLanguage: 'en',
            includedLanguages: "en,it,es,ci,fr"
        },
        'google_translate_element'
    );
}


    //Transazione inizio -> login (inizia ora)
    function inizia_login(){
        window.location.href ="login.html"
    }

    //Transazione login -> registrazione (registrati ora)
    function start_registration(){
        window.location.href = "registration.html"
    }



// transazione parti di teoria
function start_Theory(folder,Nargument){
    let pos="./Argument/"
    pos=pos.concat(folder).concat("/Theory/").concat("Theory").concat(Nargument).concat(".html");
    window.location.href =pos
}

//transazioni parti di pratica
function start_Exercise(folder,Nargument){
    let pos="./Argument/"
    pos=pos.concat(folder).concat("/Exercise/").concat("Exercise").concat(Nargument).concat(".html");
    window.location.href = pos
}


//transazioni parti di pratica
function congrat(){
    var txt;
    if (confirm("Congratulazioni, risposta esatta!")) {
        window.location.href = '../../index.html'
    } else {
        window.location.href ='../../MainGame.html'
    }
}

function alternatecollapse(a,b){
    $(a).collapse("show");
    $(b).collapse("hide");
}