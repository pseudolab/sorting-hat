// ====================================
// result.html 
// ====================================

var main = null;
var result = null;
var t2 = null;
var feature = [];
var house = null;
var house_prefix = null;
var result_img = null;

var check = true;
var scroll_elements = [];


function initElement() {
    main = document.getElementById("main");
    t2 = document.getElementById("t2");
    t3 = document.getElementById("t3");
    t4 = document.getElementById("t4");
    t5 = document.getElementById("t5");
    result_img = document.getElementById("result_img");
    door_img = document.getElementById("door_img");
}

window.addEventListener('DOMContentLoaded', function () {
    initElement();

    house_prefix = window.location.hash.slice(1);
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

    var house_join = loadFile("result/" + house_prefix + "_join.txt");
    var j_sen = house_join.split('\n');
    var how_to_join = [];
    var how_to_join_str = "";
    for (var i = 0; i < j_sen.length; i++) {
        if (j_sen[i] == '')
            continue;
        how_to_join.push(j_sen[i].slice(1));
    }
    for (var i = 0; i < how_to_join.length; i++)
        how_to_join_str += "<li class='join_li'>" + how_to_join[i] + "</li>";
    t5.innerHTML = how_to_join_str;

    door_img.src = "static/images/" + house_prefix + "_door.png";    

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
            setTimeout(checkScroll, 190);
            return;
        }
    }
}

window.onload = function () {
    main.style.opacity = "1";
    checkScroll();
};

function showPopup() {
    var popup = document.getElementById("join_popup");
    popup.classList.toggle("show");
}