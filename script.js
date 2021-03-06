//add a click handler to each card using jquery(chosen) or onclick-attribute
$(function () {  //document ready function
    randomize();
    $('.card').click(function () {
        folsom.play();
        folsom.volume=0.3;
        card_clicked(this);
    });

    $('.reset').click(function () {  //declared reset button function
        //$('.card').find('.back').show();
        $(".card").find(".back").css({
            "-webkit-transform": "perspective( 600px ) rotateY( 0deg )",
            "transform": "perspective( 600px ) rotateY( 0deg )"
        });
        $('.gameover').hide();
        games_played++;
        reset_stats();
        display_stats();
        remove_shuffle();
        randomize();
        police.play();
        folsom.pause();
        escape.pause();
        escape.currentTime = 0;
    });
});

//global variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var user_click = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var random_mug = [];

//sounds
var police = new Audio('audio/openup.mov');
var escape = new Audio('audio/escape.mp3');
var folsom = new Audio('audio/FolsomPrisonBlues.mp3');
var door = new Audio('audio/door.mov');
var robo = new Audio('audio/trouble.mov');


function randomize() {

    var card_faces = [
        "images/bowie.jpg",
        "images/cashfolsom.jpg",
        "images/Frank-Sinatra.png",
        "images/lohan.jpg",
        "images/michmug.jpg",
        "images/mug_prince.jpg",
        "images/nolte.jpg",
        "images/OJ.jpg",
        "images/snoop.jpg",
        "images/bowie.jpg",
        "images/cashfolsom.jpg",
        "images/Frank-Sinatra.png",
        "images/lohan.jpg",
        "images/michmug.jpg",
        "images/mug_prince.jpg",
        "images/nolte.jpg",
        "images/OJ.jpg",
        "images/snoop.jpg"
    ];
    var card_faces_length = card_faces.length;


    for (var i = 0; i < card_faces_length; i++) {
        var current_length = card_faces.length;
        var num = Math.floor(Math.random() * current_length);
        var temp = (card_faces.splice(num, 1));
        random_mug.push(temp[0]);
    }
    for (var j = 0; j < random_mug.length; j++) {
        $('.card:nth-child(' + (j + 1) + ')').prepend('<div class="front"><img src="' + random_mug[j] + '"></div>');
    }
}

function card_clicked(das_card) {
    if (!user_click) {          //added a flag variable for the purpose of denying a user's ability to click more than 2 cards
        return;
    }
    //shows face of card (flips back to face)
    //$(das_card).find('.back').hide();
    $(das_card).find(".back").css({
        "-webkit-transform": "perspective( 600px ) rotateY( 180deg )",
        "transform": "perspective( 600px ) rotateY( -180deg )"
    });
    $(das_card).find(".front").css({
        "-webkit-transform": "perspective( 600px ) rotateY( 0deg )",
        "transform": "perspective( 600px ) rotateY( 0deg )"
    });
    //checks if first card was clicked
    if (first_card_clicked == null) { //check if first_card_clicked == null
        first_card_clicked = $(das_card);
    } else {
        second_card_clicked = $(das_card);
        attempts++;

        //if statement to check if first and second cards clicked are equal
        if (first_card_clicked.find('.front > img').attr('src') === second_card_clicked.find('.front > img').attr('src')) {
            robo.play();
            matches++; // if card match then match_counter is incremented
            compute_accuracy(); // calls upon compute_accuracy function to compute and display accuracy percentage
            display_stats();  //update stats display
            first_card_clicked = null; // reset first and second card clicked variables
            second_card_clicked = null;
            if (matches == total_possible_matches) {
                $('.gameover').show();
                escape.play();
                escape.volume=0.6;
                folsom.pause();
            }
        } else {

            door.play();
            user_click = false; // set user_click to false to check if condition changes in function
            compute_accuracy(); //calls compute_accuracy function which performs math to display accuracy on stat bar in the game
            display_stats(); //calls display_stats function which relays updated stat information
            //sets the unmatched cards to show the back again after two seconds
            var timerId = setTimeout(function () {
                second_card_clicked.find('.back').css({
                    "transform": "rotateY(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"
                });
                second_card_clicked.find('.front').css({
                    "transform": "rotateY(-180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"
                });
                first_card_clicked.find('.back').css({
                    "transform": "rotateY(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"
                });
                first_card_clicked.find('.front').css({
                    "transform": "rotateY(-180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .2s linear 0s",
                    "transition": "-webkit-transform .2s linear 0s"
                });
                first_card_clicked = null; //reset first_card_clicked to null
                second_card_clicked = null;//reset second_card_clicked to null
                user_click = true; //set the flag variable to true when condition changed
                return (timerId);//returns the variable timerId and ends the function and cards flip back after to seconds
            }, 800);

        }  //end of else on line 42
    } //end of else on line 29
}  // end of function card_clicked


//STATS FUNCTIONS BELOW

function compute_accuracy() {
    accuracy = Math.round((matches / attempts) * 100);
}

function display_stats(){
    $('.games_played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + '%');
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function remove_shuffle() {
    $('#game-area div .front').remove();
    random_mug = [];
}


