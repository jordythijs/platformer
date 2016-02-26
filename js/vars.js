// Create other variables that will be defined later
var player,
    debug = true,
    mainContainer = $("#main"),             // The top element containing the level, player etc.
    scrollsize,                             // How big is a single step left or right (in pixels) when moving the player?
    startingPosition,
    leftLevelEdge = 450,                    // What is the starting position (in pixels)?
    rightLevelEdge,                         // position of the right edge of the level
    currentPos,                             // left edge of the view
    playerHeight,                           // height of the sprite of the player
    playerWidth,                            // width of the sprite of the player
    playerPosX,                             // horizontal position of the sprite of the player
    playerPosY,                             // vertical position of the sprite of the player
    playerLives,                            // Amount of lives of the player
    playerCoins,                            // Amount of coins of the player
    objectOnPos,                            // Variable that checks if an object is on a certain position
    objectTypeOnPos,                        // Variable that stores the type of object on a certain position
    sfx_duration,                           // Variable that stores the duration of a special effect sound
    buttonPressed = 'none',                 // Variable that stores the button that was pressed
    allowedMove,                            // Is this move allowed?
    maxJumpHeight,                          // Variable that contains the maximum height the player can jump to right now
    playerBoxCoords = {},                   // The box containing the player
    colboxposleft,                          // Collision box x1
    colboxposright,                         // Collision box x2
    colboxpostop,                           // Collision box y1
    colboxposbottom,                        // Collision box y2
    time = startTime,                       // This is the time the player has to complete the level, set in definitions.js
    timeAlmostUp = false,
    timerWarningSoundPlayed = false,        //
    scrollSize = 30,                        // How big is a single step left or right (in pixels) when moving the player?
    processingKeyPress = false,             // This variable is used to check if a key was pressed and the code to process this keypress is still busy
    playerIsDucking = false,                // These variables are used to check if the player is in a ducking position or in the air
    playerIsInTheAir = false,               // These variables are used to check if the player is in a ducking position or in the air
    timer;                                  // Start the timer
