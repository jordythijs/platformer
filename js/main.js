if($('#main').length && $('#main').blur())
{
    // Make sure the main window keeps it's focus;
    // else the key capturing will fail
    $('#main').focus();
} 

// How big is a single step left or right (in pixels) when moving the player?
var scrollSize  = 30;

// What is the starting position (in pixels)?
var leftLevelEdge = 450;

// Create other variables that will be defined later
var rightLevelEdge,          // position of the right edge of the level
    currentPos,              // left edge of the view
    playerHeight,            // height of the sprite of the player
    playerWidth,             // width of the sprite of the player
    playerPosX,              // horizontal position of the sprite of the player
    playerPosY,              // vertical position of the sprite of the player
    playerLives,             // Amount of lives of the player
    playerCoins,             // Amount of coins of the player
    objectOnPos,             // Variable that checks if an object is on a certain position
    objectTypeOnPos,         // Variable that stores the type of object on a certain position
    sfx_duration,            // Variable that stores the duration of a special effect sound
    buttonPressed = 'none',  // Variable that stores the button that was pressed
    allowedMove,             // Is this move allowed?
    maxJumpHeight,           // Variable that contains the maximum height the player can jump to right now
    colboxposleft,           // Collision box x1
    colboxposright,          // Collision box x2
    colboxpostop,            // Collision box y1
    colboxposbottom;         // Collision box y2

// This variable is used to check if a key was pressed 
// and the code to process this keypress is still busy
var processingKeyPress = false;

// These variables are used to check if the player is in a ducking position or in the air
var playerIsDucking = false;
var playerIsInTheAir = false;

// This is the time the player has to complete the level
var time = startTime;
var timeAlmostUp = false;
var timerWarningSoundPlayed = false;

// Start the timer
var timer = setInterval(countDown, 1000);

// Function to add something to the debug log
function debuglog(name,val)
{
    if(debugmode) {
        document.getElementById(name).innerHTML = val;
    }
}

function main()
{
    // This function is executed when the page has finished loading
    // Give the game window focus
    document.getElementById("level").focus();

    // Create a shorthand version for the player sprite selector
    var player = document.getElementById("player");

    // Position the player
    player.style.left    = startLeft + 'px';
    player.style.bottom  = startBottom + 'px';
    $("#player").css('bottom',convertCoords($("#player").position().top),$("#player").height());

    // Set some player variables
    playerLives = getCookie('lives',5);
    playerCoins = getCookie('coins',0);

    // Show the timer, amount of coins and amount of lives
    document.getElementById("time").innerHTML   = startTime;
    document.getElementById("coins").innerHTML  = playerCoins;
    document.getElementById("lives").innerHTML  = playerLives;

    // Get current position of the player
    // (this is actually the left edge of the view)
    currentPos    = $("#main").scrollLeft();

    // What is the player's sprite's vertical starting position in the game?
    playerBottomPos  = convertCoords($("#player").position().top,$("#player").height());

    // What are the height and width in pixels of the player sprite?
    playerHeight  = player.clientHeight;
    playerWidth   = player.clientWidth;

    // What is the position in pixels of the player sprite?
    playerPosX = player.style.left;
    playerPosY = player.style.bottom;

    // Recalculate the jump height
    jumpHeight = jumpHeight * playerHeight;

    // Set the clock, coins and lives
    playerCoins = document.getElementById("coins").innerHTML;
    playerLives = document.getElementById("lives").innerHTML;

    // Start playing the level's background music if available
    if(soundTrack != "")
    {
    document.getElementById("soundtrack").src = soundTrack;
    document.getElementById("soundtrack").play();
    }

    // Setup debugmode log
    if(debugmode) {
        var cursorX = 0;
        var cursorY = 0;
        var debugTracking = setInterval(function(){updatePositions()}, 50);

        function updatePositions(){
            document.onmousemove = function(e){
                cursorX = (e.pageX - document.getElementById("main").getBoundingClientRect().left) + $("#main").scrollLeft();
                cursorY = (e.pageY - document.getElementById("main").getBoundingClientRect().top) + $("#main").scrollTop();
            };
            debuglog("mouseposleft",cursorX+"px");
            debuglog("mousepostop",cursorY+"px");
            debuglog("colboxposleft",colboxposleft+"px");
            debuglog("colboxposright",colboxposright+"px");
            debuglog("colboxpostop",colboxpostop+"px");
            debuglog("colboxposbottom",colboxposbottom+"px");
            //debuglog("colboxoffsetleft",val);
            //debuglog("colboxoffsetbottom",val);
            //debuglog("colboxwidth",val);
            debuglog("playerposleft",playerPosX);
            //debuglog("playerpostop",playerPosY);
            //debuglog("playerposbottom",parseInt(parseInt(playerPosY)-playerHeight)+"px");
            //debuglog("playeroffsetleft",val);
            //debuglog("playeroffsetbottom",val);
            debuglog("playerwidth",playerWidth+"px");
            debuglog("playerheight",Math.ceil(playerHeight)+"px");
            debuglog("collisionobj",findObjectOnPos(playerPosX,playerPosX+playerWidth,playerPosY,playerPosX+playerHeight));
            debuglog("buttonpressed",buttonPressed);
            debuglog("allowedmove",allowedMove);
        }

    }
}

// Let the timer count down
function countDown()
{
  time = time - 1;
  document.getElementById("time").innerHTML = time;
  // Make the time red if less than 10% of the total time left
  if(time <= (startTime / 10))
  {
    timeAlmostUp = true;
    if(timeAlmostUp && !timerWarningSoundPlayed)
    {
      document.getElementById("sfx").src = "sounds/lowtimer.wav";
      document.getElementById("sfx").play();
      timerWarningSoundPlayed = true;
    }
    document.getElementById("time").style.color = "red";
  }

  if (time <= 0)
  {
     clearInterval(timer);
     playerDeath("timeUp");
     return;
  }
}

// Mute or unmute the music
function muteMusic()
{
  var muted = $("#soundtrack").prop("muted");
  var date = new Date();
  date.setTime(date.getTime()+(1000*60*60*24*365));
  if(muted)
  {
    // Sounds is muted now; unmute
    $("#soundtrack").prop("muted",false);
    document.cookie = 'music='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'music=on; expires='+date.toGMTString()+';';
    document.getElementById("muteIcon").src = "sprites/environment/mute.png";
  }
  else
  {
    // Music is not muted so mute it
    $("#soundtrack").prop("muted",true);
    document.cookie = 'music='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'music=off; expires='+date.toGMTString()+';';
    document.getElementById("muteIcon").src = "sprites/environment/unmute.png";
  }
}

// The player has lost a life
function playerDeath(reason)
{
  playerLives--;

  var date = new Date();
  date.setTime(date.getTime()+(1000*60*60*24*365));

  // Save the new amount of lives in a cookie
  document.cookie = 'lives='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'lives='+playerLives+ '; expires='+date.toGMTString()+';';

  // Pause the music and play a sound 
  document.getElementById("soundtrack").pause();
  document.getElementById("sfx").src = "sounds/die.wav";
  document.getElementById("sfx").play();
  $('#sfx').get(0).addEventListener('loadedmetadata', function() 
  {
    // What is the duration of the 'Player just died' sound effect?
    sfx_duration = $('#sfx').get(0).duration;

    // Update the display of the amount of lives
    document.getElementById("lives").innerHTML = playerLives;
    setTimeout(function()
    {
      if(reason == "timeUp")
      {
        alert("Time's up!");
      }
      if(playerLives <= 0)
      {
        // No lives left, so game over
       gameOver();
      }
      else
      {
        window.location = "index.php";
      }
    },sfx_duration);
  });
}

// No lives left..
function gameOver()
{
  document.getElementById("soundtrack").pause();
  document.getElementById("sfx").src = "sounds/gameover.wav";
  document.getElementById("sfx").play();
  
  $('#sfx').get(0).addEventListener('loadedmetadata', function() 
  {
    // What is the duration of the 'Game over' sound effect?
    sfx_duration = $('#sfx').get(0).duration;

    setTimeout(function()
    {
      alert("GAME OVER!!");
      var date = new Date();
      date.setTime(date.getTime()+(1000*60*60*24*365));

      // Reset the coins, lives and level
      document.cookie = 'coins='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'lives='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'level='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      // Refresh the page so the player can start over
      window.location = "index.php";
    },sfx_duration);
  });
}

// When you have a top coordinate of an object,
// convert this to a bottom coordinate and vice versa
function convertCoords(coordinate,objHeight)
{
  return ($("#main").height() - 2 - coordinate - objHeight);
}

// get a cookie
function getCookie(query,defaultValue)
{
    var cookie = document.cookie;
    var name = query + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return defaultValue;
}