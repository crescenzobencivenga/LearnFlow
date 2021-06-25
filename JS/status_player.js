function increment_status(USERNAME,LVL,ARG,PNT){
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

function lvl_to_name(level){
    let lvl = parseInt(level);
    console.log(lvl);
    switch (lvl) {
        case 0:
            return "Beginner";
            break;
        case 1:
            return "Neophyte";
            break;
        case 2:
            return "Initiate";
            break;
        case 3:
            return "Practitioner";
            break;
        case 4:
            return "Expert";
            break;
        case 5:
            return "Master";
            break;
    }
return "GOD";
}



