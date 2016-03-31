//add a click handler to each card using jquery(chosen) or onclick-attribute
$(function () {
    //global variables
    first_card_clicked = null;
    second_card_clicked = null;
    total_possible_matches = 9;
    user_click = true;
    matches = 0;
    attempts = 0;
    accuracy = 0;
    games_played = 0;


    $('.card').click(function () {
        randomize();
        card_clicked(this);
        return(card_clicked);
    });
    $('.reset').click(function () {  //declared reset button function
       games_played++;
       reset_stats();
       display_stats();
       randomize();
       $('.gameover').hide();
       $('.card').find('.back').show();
    });
});



function card_clicked(das_card) {
    if (!user_click) {          //added a flag variable for the purpose of denying a user's ability to click more than 2 cards
        return;
    }
    //shows face of card (flips back to face)
    $(das_card).find('.back').hide();

    //checks if first card was clicked
    if (first_card_clicked == null) { //check if first_card_clicked == null
        first_card_clicked = $(das_card)
    } else {
        second_card_clicked = $(das_card);
        attempts++;

        //if statement to check if first and second cards clicked are equal
        if (first_card_clicked.find('.front > img').attr('src')== second_card_clicked.find('.front > img').attr('src')) {
            matches++; // if card match then match_counter is incremented
            compute_accuracy(); // calls upon compute_accuracy function to compute and display accuracy percentage
            display_stats();  //update stats display
            first_card_clicked = null; // reset first and second card clicked variables
            second_card_clicked = null;
            if (matches == total_possible_matches) {
              $('.gameover').show();
            }
        } else {

            //dan start
            user_click = false; // set user_click to false to check if condition changes in function
            compute_accuracy(); //calls compute_accuracy function which performs math to display accuracy on stat bar in the game
            display_stats(); //calls display_stats function which relays updated stat information
            //sets the unmatched cards to show the back again after two seconds
            var timerId = setTimeout(function () { //declares function inside variable timerId
                $(first_card_clicked).find('.back').show(); //displays the back card after 2 seconds
                $(second_card_clicked).find('.back').show(); //displays the back  card after 2 seconds
                first_card_clicked = null; //reset first_card_clicked to null
                second_card_clicked = null;//reset second_card_clicked to null
                user_click = true; //set the flag variable to true when condition changed
                return (timerId);//returns the variable timerId and ends the function and cards flip back after to seconds
            }, 2000); // 2000 = 2 seconds
            //dan end
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







