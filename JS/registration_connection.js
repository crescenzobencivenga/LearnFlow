//let ip_py= "http://192.168.1.10:5000"
let ip_py= "http://127.0.0.1:5000"

function validateForm_registration() {
    document.getElementById("message4usr").innerHTML = "";
    document.getElementById("message0").innerHTML = "";
    document.getElementById("message1").innerHTML = "";
    document.getElementById("message2").innerHTML = "";
    document.getElementById("message3").innerHTML = "";

    //collect form data in JavaScript variables
    var pw1 = document.getElementById("form_pass").value;
    var pw2 = document.getElementById("form_pass_conf").value;
    var mail = document.getElementById("form_mail").value;
    var user = document.getElementById("form_user").value;
    let flag=0;

    //check empty mail field
    if(user === "") {
        document.getElementById("message0").innerHTML = "**fild required";
        flag=1;
    }

    //check empty mail field
    if(mail === "") {
        document.getElementById("message1").innerHTML = "**fild required";
        flag=1;
    }

    //check empty password field
    if(pw1 === "") {
        document.getElementById("message2").innerHTML = "**Fill the password please!";
        flag=1;
    }else{
        if(pw1.length < 8) {
            document.getElementById("message2").innerHTML = "**Password length must be atleast 8 characters";
            flag = 1;
        }
    }


    //check empty confirm password field
    if(pw2 === "") {
        document.getElementById("message3").innerHTML = "**Reinsert password please!";
        flag=1;
    }

    //minimum password length validation


    if(pw1 !== pw2) {
        document.getElementById("message2").innerHTML = "**Passwords are not same";
        flag=1;
    }

    return !flag;
}

function start_registration(){
    console.log("inzio inserimento....")
    // invoca il web services
    $.ajax( //esegui:
        {
            url: ip_py+"/registration",
            //conntetti al server a questo indirizzo

            type: "POST", // attenzione a specificare il tipo, controllare se sia POST or GET dal file app.py per quell'indirizzo
            //specifica il tipo di connessione

            data: {
                username: $("#form_user").val(),
                mail: $("#form_mail").val(),
                password: $("#form_pass").val()
            },
            // passagli questi dati, presi dagli elementi della form

            success: function (result) {
                if(result==="1"){
                /*
                    document.getElementById("message4usr").innerHTML = "Inserimento avvenuto con successo. Accedere al login";
                    document.getElementById("golog").style.visibility = "visible";
                    document.getElementById("form_id").style.visibility = "hidden";
                    console.log("Inserimento avvanuto con successo")
                 */
                    console.log(result);
                    window.location.href = './login.html?redirect=' + 1;
                }
                else{
                    document.getElementById("message4usr").innerHTML = "Problema creazione utente, inserire credenziali diverse";
                    console.log("Errore inserimento")
                    console.log(result)
                }

           },
            // se tutto ok, inserisci il risultato nell'elemento con id result_span,
            // ed inserisci una formattazione a questo
            error: function(){
                document.getElementById("message4usr").innerHTML = "Problema ricerca utente";
            }

        }
    );

}


function validate_register(){
    console.log("inzio verifica....")
    if( !validateForm_registration() ){
        document.getElementById("message4usr").innerHTML = "Registration Faild";
        return false;
    }
    console.log("verifica effettuata....")
    start_registration();
}
