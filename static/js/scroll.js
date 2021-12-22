// ====================================
// result.html 
// ====================================

var main = null;
var check = true;
var scroll_elements = [];


function initElement() {
    main = document.getElementById("main");
}

window.addEventListener('DOMContentLoaded', function(){
    initElement();

    scroll_elements = Array.prototype.slice.call(document.getElementsByClassName("scroll") );
});

document.addEventListener('scroll', checkScroll);

function checkScroll() {
    if (!check)
        return;
  
    for(var i=0; i<scroll_elements.length; i++) {
        if(scroll_elements[i].getBoundingClientRect().top < window.innerHeight) {
            scroll_elements[i].style.opacity = "1";
            scroll_elements.splice(i, 1);
            check=false;
            setTimeout(function(){check = true;}, 200);
            setTimeout(checkScroll, 200);
            return;
    }
  }
}

window.onload = function() {
    main.style.opacity = "1";
    checkScroll();
};