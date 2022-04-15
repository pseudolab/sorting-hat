
// ====================================
// test.html 
// ====================================
var item_width = 350;
var curr_card = 0;
var house_data = {
    'X': 0,  // -
    'G': 0,  // Gryffindor
    'R': 0,  // Ravenclaw
    'H': 0,  // Hufflepuff
    'S': 0,  // Slytherin
};
var house_data_list = []
var house = "";

var ans_data = [];
var test_data = [];
var test_num = 0;

var test = null;
var slider = null;
var prev_btn = null;
var prog_text = null;
var prog_div = null;
var prog_bar = null;


function initElement() {
    main = document.getElementById("main");
    slider = document.getElementById("qna_slider");
    prev_btn = document.getElementById("prev_btn");
    prog_text = document.getElementById("prog_text");
    prog_div = document.getElementById("prog_div");
    prog_bar = document.getElementById("prog_bar");
}

function updateProgBar() {
    prog_text.innerHTML = ""+(curr_card+1)+"/"+test_num;
    prog_value.style.width = ""+(100*(curr_card+1)/test_num)+"%";
}  

window.addEventListener('DOMContentLoaded', function(){
    initElement();

    raw_data = loadFile("test.txt");
  
    // process test data
    var sentance = raw_data.split('\n');
    for (var i=0; i<sentance.length; i++) {
        let text = sentance[i];
        if (text == '')
            continue;
        else if (text[0] == '#') {
            test_data.push([text.slice(1)]);
            test_num++;
            ans_data.push(-1);
        }
        else {
            test_data[test_num-1].push([text.slice(1), text[0]]);
        }
    }

    // make test list
    for (var i=0; i<test_data.length; i++) {
        var html_data = "<li>"+
                    "<div id=\"question\"><h2>"+test_data[i][0]+"</h2></div>"+
                    "<div id=\"answer\">";

        for (var j=1; j<test_data[i].length; j++)
            html_data += "<button class=\"answers\" id=\""+i+"_"+(j-1)+"\" onclick=\"selectAns("+i+","+(j-1)+")\">"+test_data[i][j][0]+"</button>";
                
        html_data +="</div></li>";
        slider.innerHTML += html_data;
    }
    slider.style.width = "" + item_width * (test_data.length) + "px";
    updateProgBar();
});

function selectAns(question, answer) {
    var btn = document.getElementById("" + question + "_" + ans_data[question]);
    if (question != curr_card)
        return;
    if (btn != null)
        btn.classList.remove("selected");

    ans_data[question] = answer;

    btn = document.getElementById("" + question + "_" + answer);
    btn.classList.add("selected");

    moveSlider(+1);
}

function moveSlider(dir) {
    var player = slider.animate([
        {transform: "translate("+(curr_card * -item_width)+"px, 0px)"},
        {transform: "translate("+((curr_card+dir) * -item_width)+"px, 0px)"}
    ], {duration: 360, easing: "ease-out"});
    
    player.addEventListener("finish", function(){
        slider.style.transform = "translate("+((curr_card * -item_width))+"px, 0px)";
    });
    curr_card += dir;

    if (curr_card != 0 && curr_card != test_num)
        prev_btn.style.display = "block";
    else
        prev_btn.style.display = "none";

    if (curr_card == test_num) {
        prog_text.innerHTML = "";
        main.style.opacity = "0";
        setTimeout(result, 400);

        for (var i=0; i<ans_data.length; i++) {
            house_data[test_data[i][ans_data[i]+1][1]]++;
            house_data_list.push(test_data[i][ans_data[i]+1][1])
        }
    
        house = computeHouse();
        return;
    }
    updateProgBar();
}

function computeHouse() {
    
    house_data_list.push("H", "H", "S", "S", "G", "G", "R", "R")
    let h = house_data_list[Math.floor(Math.random()*house_data_list.length)];
    
    return h
}

function result(){
    window.location.href = "result.html#" +
     house;
}
