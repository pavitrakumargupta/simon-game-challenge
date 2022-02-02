var userClickedPattern=[]
var gamePattern=[]
var buttonColours=["red", "blue", "green", "yellow"];
var started=false;
var level=0;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level "+level);
        next_sequence();
        started = true;
     }
});


$(".btn").click(function(){
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSounds(userChosenColour);
    animatePress(userChosenColour)
    checkanswer(userClickedPattern.length-1)
     
})


function next_sequence() {
    userClickedPattern=[]
    $("#level-title").text("Level " + level);
    level++
    var randomChosenColour=buttonColours[Math.floor(Math.random()*4)]
    gamePattern.push(randomChosenColour)
    animatePress(randomChosenColour)
    playSounds(randomChosenColour)
}


function playSounds(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
       $("#"+currentColour).removeClass("pressed");
       },100)
}


function checkanswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(next_sequence,1000)
        }
    }
    else{
        $("body").addClass("game-over");
        playSounds("wrong")
        setTimeout(function (){
            $("body").removeClass("game-over");
            },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}


function startOver(){
    gamePattern=[]
    level=0
    started=false
}