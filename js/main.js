if($('#main').length && $('#main').blur())
{
    // Make sure the main window keeps it's focus;
    // else the key capturing will fail
    $('#main').focus();
}

$(document).ready(function() {
    main();
});

function main() {
    player = $("#player");
    // What is the starting position (in pixels)?
    var startingPosition = getStartingPosition();
    setPlayerPosition();
    $("#player").css({
        'left': startingPosition.left+'px',
        'top': startingPosition.top+'px'
    });
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
}

function getStartingPosition() {
    var startBlock = $("[data-type=floorBlockStartPos]");
    startBlock.each(function() {
        // We only want the first starting block
        startBlock = $(this);
        return false;
    });

    startingPosition = startBlock.position();
    startingPosition.top = startingPosition.top - $("#player").height() - 3;

    return startingPosition;
}

function setPlayerPosition() {
    playerPosition = $("#player").position();
    playerPosX = playerPosition.left;
    playerPosY = playerPosition.top;
}

// Let the timer count down
function countDown() {
    time = time - 1;
    document.getElementById("time").innerHTML = time;
    // Make the time red if less than 10% of the total time left
    if (time <= (startTime / 10)) {
        timeAlmostUp = true;
        if (timeAlmostUp && !timerWarningSoundPlayed) {
            document.getElementById("sfx").src = "sounds/lowtimer.wav";
            document.getElementById("sfx").play();
            timerWarningSoundPlayed = true;
        }
        document.getElementById("time").style.color = "red";
    }

    if (time <= 0) {
        clearInterval(timer);
        playerDeath("timeUp");
    }
}
