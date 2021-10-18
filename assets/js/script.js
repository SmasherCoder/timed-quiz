//selecting all required elements
const info_box = document.querySelector(".info_box");
const submit_btn = info_box.querySelector(".buttons .submit");
const start_btn = info_box.querySelector(".buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const score_box = document.querySelector(".score_box");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
var result = 0;
var correctAnswer = true;
var stopTimer = false;
var timeLeft = 0;

info_box.classList.add("activeInfo");

// if start button clicked
start_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    startTimer(60); //calling startTimer function
}

let timeValue =  60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;

const submit = result_box.querySelector(".buttons .submit");
const correctWrong = document.querySelector("footer .correctWrong");


// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    let correctWrongTag = '<span> </span>';
    correctWrong.innerHTML = correctWrongTag;  //adding new span tag inside bottom_ques_counter

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 10; //gets 10 points for each correct answer
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
        let correctWrongTag = '<span>Correct!</span>';
        correctWrong.innerHTML = correctWrongTag;  //adding new span tag inside bottom_ques_counter
        if(que_count < questions.length - 1){ //if question count is less than total question length
            que_count++; //increment the que_count value
            que_numb++; //increment the que_numb value
            setTimeout(function(){showQuestions(que_count);}, 1000); //calling showQestions function
            //queCounter(que_numb); //passing que_numb value to queCounter
        }else{
            console.log("You got " + timeCount.textContent + " points for time left and " + userScore + " points for correct answers.");
            stopTimer = true;
            result = userScore + (parseInt(timeCount.textContent));
            setTimeout(function(){showResult();}, 1000); //calling showResult function
        }
    }else{
        userScore -= 5; //gets 5 points taken off for a wrong answer
        console.log("Wrong Answer");
        let correctWrongTag = '<span>Wrong!</span>';
        correctAnswer = false; //sets correctAnswer to false so it duducts 10 seconds in timer
        correctWrong.innerHTML = correctWrongTag;  //adding new span tag inside bottom_ques_counter
        if(que_count < questions.length - 1){ //if question count is less than total question length
            que_count++; //increment the que_count value
            que_numb++; //increment the que_numb value
            setTimeout(function(){showQuestions(que_count);}, 1000); //calling showQestions function
        }else{
            console.log("You got " + timeCount.textContent + " points for time left and " + userScore + " points for correct answers.");
            stopTimer = true;
            result = userScore + (parseInt(timeCount.textContent));
            setTimeout(function(){showResult();}, 1000); //calling showResult function
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    return correctAnswer;
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    score_box.classList.remove("activeResult"); //hide the score box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (result < 3){
        result = 0;
    }
    if (userScore < 0){
        result = 0;
    }
    let scoreTag = '<span>Your final score is  <p>'+ result +'</p>.</span>';
        scoreText.innerHTML = scoreTag;
}

function startTimer(time){
    clearInterval();
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value

        time--; //decrement the time value

        if(time < 0 && stopTimer == false){ //if timer is less than 0
            timeCount.textContent = 00;
            result = userScore;
            showResult();
        }
        if (correctAnswer == false) { //if wrong answer is selected then take off 10 seconds
            time = time - 10;
            correctAnswer = true;
        }
        if (stopTimer == true) {
            document.getElementById("timer").style.color = "white";
            document.getElementById("timerSec").style.color = "white";
        }
    }
}

// if submit button clicked
submit.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    score_box.classList.add("activeResult"); //show the score box
    result_box.classList.remove("activeResult"); //hide result box

    const MAX_HIGH_SCORES = 5;

    const highScoresList = document.getElementById("highScores");
    var intials = document.getElementById('intials').value;

    const hsarray = JSON.parse(localStorage.getItem("hsarray")) || [];

    const score = {
        intials: intials,
        score: result
    };
    console.log(score);
    hsarray.push(score);
    hsarray.sort((a, b) => b.score - a.score);
    hsarray.splice(5);

    localStorage.setItem("hsarray", JSON.stringify(hsarray));

    console.log(localStorage);

//    highScoresList.innerHTML =
//    hsarray.map(score => {
//        var garbage = '<li>'+ score.intials + "-" +  score.score '</li>';
//        highScoresList.innerHTML = garbage;
//})
//.join("");
}
