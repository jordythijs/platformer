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
    if (debug) {
        console.log("Start moving to the right");
    }
    setPlayerPosition();

    processingKeyPress = true;
    if (!playerIsDucking) {
        changeSprite('walkRight');
    } else {
        changeSprite('duckWalkRight');
    }

    if (!moveAllowed("walkRight")) {
        return false;
    }

    hooks("preMoveRight");

    if (!doCollision(hasCollision("walkRight"))) {
        hooks("postMoveRight");
        return;
    }

    mainContainer.scrollLeft(currentPos + scrollSize);
    player.css('left', (player.position().left + player.width())+'px');
    setPlayerPosition();
    player.promise().done(
        function () {
            processingKeyPress = false;
        }
    );

    hooks("postMoveRight");

    return true;
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
    if (debug) {
        console.log("Checking collision..");
    }
    var collision = false;
    var collisionBoxDimensions = {
        topLeft:    [0, 0],
        topRight:   [0, 0],
        lowerLeft:  [0, 0],
        lowerRight: [0, 0]
    };

    switch (action) {
        case "walkRight":
            collisionBoxDimensions.topLeft = [playerPosX + playerWidth, playerPosY];
            collisionBoxDimensions.topRight = [playerPosX + (2 * playerWidth), playerPosY];
            collisionBoxDimensions.lowerLeft = [playerPosX + playerWidth, playerPosY - playerHeight];
            collisionBoxDimensions.lowerRight = [playerPosX + (2 * playerWidth), playerPosY] - playerHeight;
            break;
        case "duckWalkRight":
            break;
        case "walkLeft":
            break;
        case "duckWalkLeft":
            break;
        case "jump":
            break;
    }

    // todo: Check if there's an object in the collisionBox
    if (collision) {
        collision = true;
    }

    if (debug) {
        debugDrawBox(playerPosX + playerWidth, playerPosY, playerWidth, playerHeight, 'blue', 'collisionBox');
        debugPlayerPos();
    }

    return collision;
}

function doCollision(moveType) {
    "use strict";
}

function moveAllowed(moveType) {
    "use strict";
    return true;
}
