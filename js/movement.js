// Check for all enabled key presses
$(document).on("keydown", function (event) {
    if (!processingKeyPress) {
        // No keypress is being processed
        switch (event.keyCode) {
            case $.ui.keyCode.LEFT:
                buttonPressed = "left";
                moveLeft();
                break;
            case $.ui.keyCode.RIGHT:
                buttonPressed = "right";
                moveRight();
                break;
            case $.ui.keyCode.UP:
                buttonPressed = "up";
              if (!playerIsInTheAir) {
                moveUp();
              }
                break;
            case $.ui.keyCode.DOWN:
                buttonPressed = "down";
              if (!playerIsInTheAir) {
                moveDown();
              }
                break;
        }
    }
});

function moveLeft() {}

function moveRight() {
    if (debug) { console.log("Start moving to the right"); }
    processingKeyPress = true;
    if (!playerIsDucking) {
        changeSprite('walkRight');
    } else {
        changeSprite('duckWalkRight');
    }

    if (!moveAllowed("walkRight")) {
        return;
    }

    hooks("preMoveRight");

    if (hasCollision("walkRight")) {
        doCollision("walkRight");
    }

    mainContainer.scrollLeft(currentPos + scrollSize);
    player.style.left = (startLeft + currentPos) + 'px';
    setPlayerPosition();
    player.promise().done(
        function () {
            processingKeyPress = false;
        }
    );

    hooks("postMoveRight");
}

function moveUp() {}

function moveDown() {}

function changeSprite(toType) {
    switch (toType) {
        case 'walkRight':
            $("#player").attr("src", "sprites/player/walk.png").delay(50).queue(
                function (next) {
                    $(this).attr("src", "sprites/player/run.png");
                    next();
                }
            ).delay(50).queue(
                function (next) {
                    $(this).attr("src", "sprites/player/right.png");
                    next();
                }
            );
            $("#player").removeClass('faceLeft');
            $("#player").addClass('faceRight');
            break;
        case 'duckWalkRight':
            $("#player").attr("src", "sprites/player/duck.png").delay(50).queue(
                function (next) {
                    $(this).attr("src", "sprites/player/duck_run.png");
                    next();
                }
            ).delay(50).queue(
                function (next) {
                    $(this).attr("src", "sprites/player/duck.png");
                    next();
                }
            );
            $("#player").removeClass('faceLeft');
            $("#player").addClass('faceRight');
            break;
    }
}

function hasCollision(action) {
    hasCollision = false;

    switch(action) {
        case "walkRight":
            break;
    }

    return hasCollision;
}
