let buttonColors = ["red","blue", "green", "yellow"];
let userChosenPattern = [];
let gamePattern= [];
let started= false;
let level = 0;

$(document).keypress(function (e) { 
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSeq();
        started=true;
        console.log("game pattern first: " + gamePattern);
    }
});

//Logs user button clicks
$('.btn').click(function () { 
    let userChosenColor = "";

    userChosenColor = this.id;
    userChosenPattern.push(userChosenColor);
    
    playSound(this.id);
    animatePress(this.id);

    checkUserSequence(userChosenPattern.length-1)
    // console.log("user: " + userChosenPattern); //for debuging
    // console.log("game: " + gamePattern);

    
});


//Determines the next button in the sequence
function nextSeq()
{
    userChosenPattern = [];

    level++;
    $("h1").text("Level "+ level);

    let randNum = Math.floor(Math.random()*4);
    let randomColor = buttonColors[randNum]; //select random color
    
    
    //Add a new color to the sequence
    gamePattern.push(randomColor);

    playSound(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(200) //"flashing" animation
    // animatePress(randomColor);
    

}

function playSound(name)
{
    let sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(color)
{
    console.log($("#"+color));

    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}

function checkUserSequence(currentLevel)
{
    if(userChosenPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userChosenPattern.length===gamePattern.length )
        {
            console.log("Hell yeahhhh boiiiiiii!");
            setTimeout(function(){
                nextSeq();
            }, 1000);
        }
    }
    else {
        console.log("Awww chucks :(");
        gameOver();
    }
}

function gameOver()
{
    level = 0;
    started = false;
    gamePattern = [];

    let sound = new Audio("./sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart");

}