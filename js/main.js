// todo: fill the var objectsMatrix
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
    playerWidth = player.outerWidth();
    playerHeight = player.outerHeight();
    mainContainer = $("#main");

    // What is the starting position (in pixels)?
    var startingPosition = getStartingPosition();
    setPlayerPosition();
    $("#player").css({
        'left': startingPosition.left+'px',
        'top': startingPosition.top+'px'
    });

    if (debug) {
        mainContainer.mousemove(function (e) {
                $("#mouseposleft").text(e.pageX + "px");
                $("#mousepostop").text(e.pageY + "px");
            }
        );
    }

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

function debugPlayerPos() {
    "use strict";
    var playerEl = $("#player");
    var offset = playerEl.offset();
    var pos = playerEl.position();

    $("#playerposleft").text(pos.left);
    $("#playerposright").text(pos.left + playerEl.width());
    $("#playerpostop").text(pos.top);
    $("#playerposbottom").text(pos.top - playerEl.height());
    $("#playeroffsetleft").text(offset.left);
    $("#playeroffsetright").text(offset.left + +playerEl.width());
    $("#playeroffsettop").text(offset.top);
    $("#playeroffsetbottom").text(offset.top - -playerEl.height());
    $("#playerwidth").text(playerEl.width());
    $("#playerheight").text(playerEl.height());
}

function debugDrawBox(left, top, width, height, color, name) {
    "use strict";
    if (debug) {
        var levelOffset = $("#level").offset();
        var relativeLeft = left + levelOffset.left;
        var relativeTop = top + levelOffset.top;
        console.log("Drawing box..");
        console.log(relativeLeft, relativeTop, width, height, color, name);
        $("#colboxposleft").text(left);
        $("#colboxposright").text(left + width);
        $("#colboxpostop").text(top);
        $("#colboxposbottom").text(top + height);
        $("#colboxoffsetleft").text(relativeLeft);
        $("#colboxoffsetright").text(relativeLeft + width);
        $("#colboxoffsettop").text(relativeTop);
        $("#colboxoffsetbottom").text(relativeTop + height);
        $("#colboxwidth").text(width);
        $("#colboxheight").text(height);
    }

    if ($("#" + name).length) {
        $("#" + name).remove();
    }

    var html = '<div id="' + name + '" style="';
    html += 'border: 1px solid ' + color + ';';
    html += 'position: absolute;';
    html += 'left: ' + left + 'px;';
    html += 'top: ' + top + 'px;';
    html += 'width: ' + width + 'px;';
    html += 'height: ' + height + 'px;';
    html += '"></div>';

    $("#level").append(html);
}


