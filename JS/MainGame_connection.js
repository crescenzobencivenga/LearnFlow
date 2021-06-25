let ip_py= "http://127.0.0.1:5000"

function assign_page(){
    let user = getCookie('username');
    if (user==null){
        window.location.href='./login.html'
    }
    let pnt = getCookie('pnt');
    let arg = getCookie('arg');
    let lvl = getCookie('lvl');

    document.getElementById("put_username").innerHTML = user.toString();
    document.getElementById("put_username2").innerHTML = user.toString();

    document.getElementById("put_pnt2").innerHTML = pnt.toString();
    document.getElementById("put_pnt").innerHTML = pnt.toString();

    document.getElementById("put_lvl").innerHTML = lvl_to_name(lvl.toString()).toString();

    $.ajax( //esegui:
        {
            url: ip_py+"/get_top",
            type: "GET",
            data: {},
            success: function (data){
                let result = JSON.parse(data);
                let n = result[0]['n_item'];
                console.log(n)
                let content1 = "<div class=\"row justify-content-center\" translate=\"no\">";
                let usr, pnt;
                let content2 = "</div>";
                let tot_u='', tot_p='';
                for (let i =1; i<=n ; i++){
                    // console.log(i+' = '+result[i]['username']+' '+result[i]['pnt'])
                    usr = result[i]['username']
                    pnt = result[i]['pnt']
                    tot_u = tot_u.concat(content1).concat(usr).concat(content2)
                    console.log(tot_u)
                    tot_p = tot_p.concat(content1).concat(pnt).concat(content2)
                    console.log(tot_p)
                }
                $("#put_top_usr").html(tot_u);
                $("#put_top_pnt").html(tot_p);


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

function exit_user(){
    deleteAllCookies()
    window.location.href='./index.html'
}

/* @TODO
    quando fai il login, flask restituisce un json formato da [username][lvl][arg][pnt]...
    ... in questo caso il login_connection li salva nei cookie...
    (controllare se ci sono già altri cookies precedenti),
    allora in questo caso, MainGame_connection, li prende e setta la pagina  al lvl e arg e pnt memorizzati
*/
