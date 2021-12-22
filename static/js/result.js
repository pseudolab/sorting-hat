// ====================================
// result.html 
// ====================================

var main = null;
var result = null;
var t2 = null;
var feature = [];
var house = null;
var result_img = null;

var check = true;
var scroll_elements = [];


function initElement() {
    main = document.getElementById("main");
    t2 = document.getElementById("t2");
    t3 = document.getElementById("t3");
    t4 = document.getElementById("t4");
    result_img = document.getElementById("result_img");
}

window.addEventListener('DOMContentLoaded', function () {
    initElement();

    var house_prefix = window.location.hash.slice(1);
    var house_feature = loadFile("result/" + house_prefix + ".txt");
    var house_result = loadFile("result/house.txt");

    var f_sen = house_feature.split('\n');
    for (var i = 0; i < f_sen.length; i++) {
        if (f_sen[i] == '')
            continue;
        feature.push(f_sen[i].slice(1));
    }

    var h_sen = house_result.split('\n');
    for (var i = 0; i < h_sen.length; i++) {
        if (h_sen[i] == '')
            continue;
        var word = h_sen[i].split('#');
        if (word[0] == house_prefix) {
            house = word[1];
        }
    }

    result_img.src = "static/images/" + house_prefix + ".png";

    t2.innerHTML = house;

    var feature_str = "";
    var moto_str = "";
    for (var i = 0; i < feature.length; i++)
        if (i == 0)
            moto_str = feature[i]
    else {
        feature_str += "<li class=\"scroll\">" + feature[i] + "</li>";
    }

    t3.innerHTML = moto_str
    t4.innerHTML = feature_str;

    scroll_elements = Array.prototype.slice.call(document.getElementsByClassName("scroll"));
});

document.addEventListener('scroll', checkScroll);

function checkScroll() {
    if (!check)
        return;

    for (var i = 0; i < scroll_elements.length; i++) {
        if (scroll_elements[i].getBoundingClientRect().top < window.innerHeight) {
            scroll_elements[i].style.opacity = "1";
            scroll_elements.splice(i, 1);
            check = false;
            setTimeout(function () {
                check = true;
            }, 190);
            setTimeout(checkScroll, 200);
            return;
        }
    }
}

window.onload = function () {
    main.style.opacity = "1";
    checkScroll();
};


// function setCookie(c_name, value, exdays) {
//     var exdate = new Date();
//     exdate.setDate(exdate.getDate() + exdays);
//     var c_value = escape(value) +
//         ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
//     document.cookie = c_name + "=" + c_value;
// }

// function getCookie(c_name) {
//     var i, x, y, ARRcookies = document.cookie.split(";");
//     for (i = 0; i < ARRcookies.length; i++) {
//         x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
//         y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
//         x = x.replace(/^\s+|\s+$/g, "");
//         if (x == c_name) {
//             return unescape(y);
//         }
//     }
// }

// var song = document.getElementsByTagName('audio')[0];
// var played = false;
// var tillPlayed = getCookie('timePlayed');

// function result_update() {
//     if (!played) {
//         if (tillPlayed) {
//             song.currentTime = tillPlayed;
//             played = true;
//         } else {
//             played = true;
//         }
//     } else {
//         setCookie('timePlayed', song.currentTime);
//     }
// }

// var currentUrl = window.location.href;
// if (currentUrl.includes("result")) {
//     setInterval(result_update, 1000);
//     song.play();
// }