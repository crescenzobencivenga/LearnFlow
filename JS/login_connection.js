//let ip_py= "http://192.168.1.10:5000"
let ip_py= "http://127.0.0.1:5000"

function before_load(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get('redirect')
    // controlla prima se c'è stata una redirezione (tramite parametro passati nell'URL) nella redirect
    if(page_type==="1"){ // se c'è vuol dire che è il login che deve avvenire dopo la registrazione, per cui bisogna far visualizzare un messaggio
        console.log("redirezionato:"+page_type);
        document.getElementById("message4usr").innerHTML = "Registrazione effettuata, effettuare login";
        return;
    }

    let USERNAME = getCookie('username');
    if(USERNAME==null || USERNAME==''){
        console.log("non c'è nessun utente nei coockies")
        return;
    }

    console.log("c'è un utente nei coockies")
    let LVL = getCookie('lvl').toString();
    let ARG = getCookie('arg').toString();
    let PNT = getCookie('pnt').toString();

    if ((LVL != null && ARG != null &&  PNT != null ) ||  (LVL !== '' && ARG !== '' &&  PNT !== '' ) )  {
        //c'è gia loggato qualcuno, controlla se ci sono degli aggiornamenti

        $.ajax( //esegui:
            {
                url: ip_py+"/get_data",
                type: "POST",
                data: {
                    username: getCookie('username').toString()
                },
                success: function (data) {
                    if (data == null) { // se non c'è risposta (user non registrato) data=null
                        document.getElementById("message4usr").innerHTML = "immettere credenziali accesso";
                        return;
                    }
                    console.log(data['user_data'])
                    let p= data['user_data'].pnt;
                    // se il punteggio salvato è maggiore rispetto a quello nei cookies
                    if (p<PNT){ // basta aggiornare i coockies
                        document.cookie = "username=" + data['user_data'].username;
                        document.cookie = "lvl=" + data['user_data'].lvl;
                        document.cookie = "arg=" + data['user_data'].arg;
                        document.cookie = "pnt=" + data['user_data'].pnt;
                        window.location.href ='./MainGame.html'
                    }
                    else{ // altrimenti bisogna aggiorare la tupla salvata nel database
                        $.ajax( //esegui:
                            {
                                url: ip_py+"/update_data/"+USERNAME+'/'+LVL+'/'+ARG+'/'+PNT,
                                type: "POST",
                                data: {},
                                success: function (data) {
                                    console.log(data)
                                    if (data === "0") { // se non c'è risposta (user non registrato) data=null
                                        console.log(data['user_data'].username)
                                        document.cookie = "username="+data['user_data'].username;
                                        document.cookie = "lvl="+data['user_data'].lvl;
                                        document.cookie = "arg="+data['user_data'].arg;
                                        document.cookie = "pnt="+data['user_data'].pnt;
                                        console.log("dati aggiunti alla cache")
                                        window.location.href = './MainGame.html'
                                    }else{
                                        document.getElementById("message4usr").innerHTML = "Nome utente e password non corrispondono";
                                        window.location.href = './MainGame.html'
                                    }

                                },
                                error: function() {
                                    document.getElementById("message4usr").innerHTML = "Problema ricerca utente";
                                }

                            }
                        );
                    }

                },
                error: function () {
                    document.getElementById("message4usr").innerHTML = "Problema connessione al Server, reinserire credenziali";
                }
            });
    }
}


function validateForm_login() {
    document.getElementById("message4usr").innerHTML = "";
    document.getElementById("message0").innerHTML = "";
    document.getElementById("message1").innerHTML = "";
    //collect form data in JavaScript variables
    var pw1 = document.getElementById("form_pass").value;
    var mail = document.getElementById("form_mail").value;
    let flag=0;

    //check empty mail field
    if(mail === "") {
        document.getElementById("message0").innerHTML = "**fild required!";
        flag=1;
    }

    //check empty password field
    if(pw1 === "") {
        document.getElementById("message1").innerHTML = "**Fild required!";
        flag=1;
    }

    return !flag;
}


function login_control(){
    console.log("inizio controllo dati...")

    $.ajax( //esegui:
        {
            url: ip_py+"/login",
            type: "POST",
            data: {
                mail: $("#form_mail").val(),
                password: $("#form_pass").val(),
            },
            success: function (data){
                if(data==="0"){ // se non c'è risposta (user non registrato) data=null
                    document.getElementById("message4usr").innerHTML = "Utente non trovato";
                    return;
                }
                console.log(data)
                console.log(data['user_data'].username)
                document.cookie = "username="+data['user_data'].username;
                document.cookie = "lvl="+data['user_data'].lvl;
                document.cookie = "arg="+data['user_data'].arg;
                document.cookie = "pnt="+data['user_data'].pnt;
                console.log("dati aggiunti alla cache")
                window.location.href = './MainGame.html'
            },
            error: function() {
                document.getElementById("message4usr").innerHTML = "Problema di connessone";
            }

        }
    );
}



function validate_login() {
    console.log("inizio verifica login...")
    if (!validateForm_login()) { // se il form NON è stato considerato "valutabile" e ben strutturato
        document.getElementById("message4usr").innerHTML = "Login Faild";
        return false;
    }
    console.log("verifica andata a buon fine...")

    login_control()
}