var player,
    scrollSize,
    leftLevelEdge,
    startingPosition = {};

if($('#main').length && $('#main').blur())
{
    // Make sure the main window keeps it's focus;
    // else the key capturing will fail
    $('#main').focus();
}

$(document).ready(function() {
    "use strict";
    main();
});

function main() {
    player = $("#player");
// How big is a single step left or right (in pixels) when moving the player?
    var scrollSize = 30;
// What is the starting position (in pixels)?
    var startingPosition = getStartingPosition();
}

function getStartingPosition() {
    var startBlock = $("[data-type=floorBlockStartPos]");
    startBlock.each(function() {
        // We only want the first starting block
        startBlock = $(this);
        return false;
    });

    startingPosition = startBlock.offset();
    console.log(startingPosition);
    $("level").append('<div style="border: 1px solid blue; width: 30px; height: 30px; position: absolute; left:' +
                     ' "'+startingPosition.x+'px; top: '+startingPosition.y+'px;"></div>');
}
