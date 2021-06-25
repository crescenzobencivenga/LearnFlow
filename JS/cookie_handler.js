
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(cname, cvalue, exdays, pathh) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"+pathh;
}


function deleteAllCookies() {

    // var allCookies = document.cookie.split(';');
    // // The "expire" attribute of every cookie is
    // // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    // for (var i = 0; i < allCookies.length; i++)
    //     document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();

    // jQuery(document).ready(function ($) {
    //     var cookies = $.cookie();
    //     for (var cookie in cookies) {
    //         console.log(cookie);
    //         $.removeCookie(cookie);
    //     }
    // });

    document.cookie = "username=";
    document.cookie = "lvl=";
    document.cookie = "arg=";
    document.cookie = "pnt=";
}