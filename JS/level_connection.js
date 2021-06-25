
function assign_page_2(){
    let user = getCookie('username');
    if (user==null){
        window.location.href='../../../login.html'
    }
    let pnt = getCookie('pnt');
    let arg = getCookie('arg');
    let lvl = getCookie('lvl');

    document.getElementById("put_username").innerHTML = user.toString();

    document.getElementById("put_pnt2").innerHTML = pnt.toString();
}


//transazioni parti di pratica
function start_Exercise_2(folder,Nargument){
    let pos="../../"
    pos=pos.concat(folder).concat("/Exercise/").concat("Exercise").concat(Nargument).concat(".html");
    window.location.href = pos
}

function exit_user_2(){
    deleteAllCookies()
    window.location.href='../../../login.html'
}