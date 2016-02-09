// Check for all enabled key presses
$(document).on("keydown", function(event) 
{
  if(!processingKeyPress)
  {
    // No keypress is being processed
    switch(event.keyCode) 
    {
      case $.ui.keyCode.LEFT:
          buttonPressed = "left";
        moveLeft();
        break;
      case $.ui.keyCode.RIGHT:
          buttonPressed = "right";
        moveRight();
        break;
      case $.ui.keyCode.UP:
        if(!playerIsInTheAir) moveUp();
          buttonPressed = "up";
        break;
      case $.ui.keyCode.DOWN:
        if(!playerIsInTheAir) moveDown();
          buttonPressed = "down";
          break;
    }
  }
});

function moveLeft()
{
  // Move the player to the left
  processingKeyPress = true;
  if(!playerIsDucking)
  {
    $("#player").attr("src","sprites/player/walk.png").delay(50).queue(function(next){$(this).attr("src","sprites/player/run.png");next();}).delay(50).queue(function(next){$(this).attr("src","sprites/player/right.png");next();});
    $("#player").removeClass('faceRight');
    $("#player").addClass('faceLeft');
  }
  else
  {
    $("#player").attr("src","sprites/player/duck.png").delay(50).queue(function(next){$(this).attr("src","sprites/player/duck_run.png");next();}).delay(50).queue(function(next){$(this).attr("src","sprites/player/duck.png");next();});
    $("#player").removeClass('faceRight');
    $("#player").addClass('faceLeft');
  }
  if(moveConsequence("left"))
  {
    if ((currentPos - scrollSize) >= 0)
    {
      // Going left is OK because the level's left edge has not been reached yet
      // Move the player 1 step to the left
      $("#main").scrollLeft(currentPos - scrollSize);
      currentPos = $("#main").scrollLeft();
      player.style.left    = (startLeft + currentPos) + 'px';
    }

    // Store the new position of the sprite of the player
    playerPosX = player.style.left;
    playerPosY = player.style.bottom;
  }
  $("#player").promise().done(function(){
    processingKeyPress = false;
  });

  // Is there something to stand on beneath the player's feet?
  // Is not, then fall until there is something beneath his feet
  var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
  var x2 = x1+playerWidth - 2;
  var y2 = parseInt($("#player").css("bottom").substring(0,($("#player").css("bottom").length - 2)));
  var y1 = y2 - 5;
  var foundObject = findObjectOnPos(x1,x2,y1,y2);
  if(foundObject === false)
  {
    // Whoops, no ground directly beneath him! Falling now..
    playerIsInTheAir = true;
    $("#player").animate(
    {
      bottom: '0px'
      },
      {
        duration: 900,
        step: function()
        {
          // Check if there's a landing spot while falling to end the fall
          var y2 = parseInt($("#player").css("bottom").substring(0,($("#player").css("bottom").length - 2)));
          var y1 = y2 - 5;
          var foundObject = findObjectOnPos(x1,x2,y1,y2); 
          if(foundObject !== false && !window[foundObject].canGoThrough)
          {
           // Found it!
           $("#player").stop();
            playerPosY = y2+'px';
          } 
        }
    });
    playerIsInTheAir = false; 
  }
}

function moveRight()
{
  // Move the player to the right
  processingKeyPress = true;

  if(!playerIsDucking)
  {
    $("#player").attr("src","sprites/player/walk.png").delay(50).queue(function(next){$(this).attr("src","sprites/player/run.png");next();}).delay(50).queue(function(next){$(this).attr("src","sprites/player/right.png");next();});
    $("#player").removeClass('faceLeft');
    $("#player").addClass('faceRight');
  }
  else
  {
    $("#player").attr("src","sprites/player/duck.png").delay(50).queue(function(next){$(this).attr("src","sprites/player/duck_run.png");next();}).delay(50).queue(function(next){$(this).attr("src","sprites/player/duck.png");next();});
    $("#player").removeClass('faceLeft');
    $("#player").addClass('faceRight');
  }
  // Check if this move has consequences
  if(moveConsequence("right"))
  {
    // What is the x-coordinate of the right edge of the level?
    level.rightEdge = $("#level").width();

    if ((currentPos + scrollSize) <= level.rightEdge)
    {
      // Going right is OK because the level's right edge has not been reached yet
      // Move the player 1 step to the right
      $("#main").scrollLeft(currentPos + scrollSize);
      currentPos = $("#main").scrollLeft();
      player.style.left    = (startLeft + currentPos) + 'px';
    }

    // Store the new position of the sprite of the player
    playerPosX = player.style.left;
    playerPosY = player.style.bottom;
  }

  $("#player").promise().done(function(){
    processingKeyPress = false;
  });

  // Is there something to stand on beneath the player's feet?
  // Is not, then fall until there is something beneath his feet
  var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
  var x2 = x1+playerWidth - 2;
  var y2 = parseInt($("#player").css("bottom").substring(0,($("#player").css("bottom").length - 2)));
  var y1 = y2 - 5;
  var foundObject = findObjectOnPos(x1,x2,y1,y2);
  if(foundObject === false)
  {
    // Whoops, no ground directly beneath him! Falling now..
    playerIsInTheAir = true;
    $("#player").animate(
    {
      bottom: '0px'
      },
      {
        duration: 900,
        step: function()
        {
          // Check if there's a landing spot while falling to end the fall
          var y2 = parseInt($("#player").css("bottom").substring(0,($("#player").css("bottom").length - 2)));
          var y1 = y2 - 5;
          var foundObject = findObjectOnPos(x1,x2,y1,y2); 
          if(foundObject !== false && !window[foundObject].canGoThrough)
          {
           // Found it!
           $("#player").stop();
            playerPosY = y2+'px';
          } 
        }
    });
    playerIsInTheAir = false; 
  }
}

function moveUp()
{
  // Move the player upwards
  processingKeyPress = true;
  if(moveConsequence("up"))
  {
   // Is the playing ducking or standing up?
    if(playerIsDucking)
    {
      playerHeight = playerHeight / 2 * 3;
      var heightDiff = playerHeight - (playerHeight/3*2);
      player.style.bottom = (parseInt(player.style.bottom.substring(0,(player.style.bottom.length - 2)))) + 'px';
      $("#player").attr("src","sprites/player/right.png");
      playerIsDucking = false;
      processingKeyPress = false;
   }
    else
    {
      // Go up...
      playerIsInTheAir = true; 
      $("#player").attr("src","sprites/player/jump.png");
      var newTopPos = maxJumpHeight - $("#player").height();
      processingKeyPress = false;
      $("#player").animate({bottom: newTopPos+'px'},200);
      // ...Aaaaaand fall back down
      $("#player").promise().done(function()
      {
        $("#player").attr("src","sprites/player/right.png");
        $("#player").css("text-indent",1000);
var debug = parseInt($("#player").css("text-indent").substring(0,($("#player").css("text-indent").length - 2)));
        $("#player").animate(
        {
          textIndent: 0
          },
          {
            duration: 1000,
            easing: 'linear',
            progress: function()
            {
debug = parseInt($("#player").css("text-indent").substring(0,($("#player").css("text-indent").length - 2)));
              // Check if there's a landing spot while falling to end the fall
              playerPosX = player.style.left;
              var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
              var x2 = x1+playerWidth - 2;
              var y2 = parseInt($("#player").css("bottom").substring(0,($("#player").css("bottom").length - 2)));
              var y1 = y2 - 2;

              var foundObject = findObjectOnPos(x1,x2,y1,y2); 
              if(foundObject !== false && !window[foundObject].canGoThrough)
              {
               // Found a place to land on!
               $("#player").stop();
               playerPosY = y2+'px';
              }
              else
              {
                $("#player").css("bottom",(y2-2)+"px");
              } 
            }
        });
        playerIsInTheAir = false; 
      });
    }
    
    // Store the new position of the sprite of the player
    playerPosX = player.style.left;
    playerPosY = player.style.bottom;
    playerTopPos = playerPosY;
  }
}

function moveDown()
{
  // Move the player downwards
  processingKeyPress = true;
  if(moveConsequence("down"))
  {
    playerIsDucking = true;
    playerHeight = playerHeight / 3 * 2;
    var heightDiff = (playerHeight/2*3) - playerHeight;
    player.style.bottom = (parseInt(player.style.top.substring(0,(player.style.top.length - 2)))) + 'px';
    $("#player").attr("src","sprites/player/duck.png");

    // Store the new position of the sprite of the player
    playerPosX = player.style.left;
    playerPosY = player.style.bottom;
  }
  processingKeyPress = false;
}

function moveConsequence(direction)
{
  // Check if the move the player is about to do has consequences
  // (like falling in a pit or receiving a powerup)
  // Returns false if the move is not allowed, else returns true
  if(direction == "up")
  {
    if(playerIsDucking)
    {
      // Is there something between where the player is now and where he will be?
      var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
      var x2 = x1+playerWidth - 2;
      var y1 = parseInt(playerPosY.substring(0,(playerPosY.length - 2))) + playerHeight;
      var y2 = parseInt(playerPosY.substring(0,(playerPosY.length - 2))) + (playerHeight/2*3);

      var foundObject = findObjectOnPos(x1,x2,y1,y2);
      if(foundObject === false)
      {
        // No object in the player's way!
        allowedMove = true;
        return true;
      }
      else
      {
        // There's something in the player's way!
        window[foundObject].onTouch();
         if(window[foundObject].canGoThrough && !window[foundObject].isDangerousToTouch) return;
          allowedMove = false;
          return false;
      }
    } 
    else
    {
      document.getElementById("sfx").src = "sounds/jump.wav";
      document.getElementById("sfx").play();
      // Is there something between where the player is now and where he will be?
      var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
      var x2 = x1+playerWidth - 2;
      var y1 = parseInt(playerPosY.substring(0,(playerPosY.length - 2))) + playerHeight;
      var y2 = y1+jumpHeight;
      var foundObject = findObjectOnPos(x1,x2,y1,y2);
      if(foundObject === false)
      {
        // No object in the player's way!
        // maxJumpHeight is the maximum height to where the player can jump
        maxJumpHeight = playerBottomPos + (jumpHeight+parseInt(playerPosY.substring(0,(playerPosY.length - 2)))) + playerHeight;
          allowedMove = true;
          return true;
      }
      else
      {
        // There's something in the player's way!
        // Player can jump to the height where he touches the bottom of the object above him
        maxJumpHeight = convertCoords($("#foundObject").position().top,$("#foundObject").height());
        window[foundObject].onTouch($("#foundObject").data("id"));
        if(window[foundObject].canGoThrough && !window[foundObject].isDangerousToTouch) return;
        allowedMove = true;
        return true;
      }
    }  
  }
  
  if(direction == "down")
  {
    allowedMove = true;
    return true;
  }

  if(direction == "left")
  {
    // Is there something between where the player is now and where he will be?
    var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)))- 0.5*playerWidth;
    var x2 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
    var y1 = parseInt(playerPosY.substring(0,(playerPosY.length - 2)));
    var y2 = y1+playerHeight;

    var foundObject = findObjectOnPos(x1,x2,y1,y2);
    if(foundObject === false)
    {
      // No object in the player's way!
      allowedMove = true;
      return true;
    }
    else
    {
      // There's something in the player's way!
       window[foundObject].onWalk();
       window[foundObject].onTouch();
       if(window[foundObject].canGoThrough && !window[foundObject].isDangerousToTouch) return;
       allowedMove = false;
       return false;
    }
  }

  if(direction == "right")
  {
    // Is there something between where the player is now and where he will be?
    var x1 = parseInt(playerPosX.substring(0,(playerPosX.length - 2)));
    var x2 = x1+playerWidth;
    var y1 = parseInt(playerPosY.substring(0,(playerPosY.length - 2)));
    var y2 = y1+playerHeight;

    if(debugmode) {
      // Debug for collision detection; show the box for the detection
      var debugdiv = document.getElementById("checkPositiondiv");
      debugdiv.style.zIndex = '9999';
      debugdiv.style.border = '1px solid red';
      debugdiv.style.position = 'absolute';
      debugdiv.style.left = x1 + 'px';
      debugdiv.style.bottom = y1 + 'px';
      debugdiv.style.width = (x2 - x1) + 'px';
      debugdiv.style.height = (y2 - y1) + 'px';
      colboxposleft = x1;
      colboxposright = x2;
      colboxpostop = y1;
      colboxposbottom = y2;
      // End of debug code
    }

    var foundObject = findObjectOnPos(x1,x2,y1,y2);
    if(foundObject === false)
    {
        // No object in the player's way!
        allowedMove = true;
        return true;
    }
    else
    {
      // There's something in the player's way!
       window[foundObject].onWalk();
       window[foundObject].onTouch();
       if(window[foundObject].canGoThrough && !window[foundObject].isDangerousToTouch) return;
       return false;
    }
  }
}

// Find out if there is an object inside a certain rectangle (like an enemy or a block)
// x1 = horizontal starting point
// x2 = horizontal ending point
// y1 = vertical starting point
// y2 = vertical ending point
function findObjectOnPos(x1,x2,y1,y2)
{
  var allObjects = document.querySelectorAll('[data-type]');
  for(var i=0; i<allObjects.length; i++)
  {
    var offsetLeft    = allObjects[i].offsetLeft;
    var offsetBottom  = $("#main").height() - allObjects[i].offsetTop; 

    if ((x1 <= offsetLeft && x2 >= offsetLeft) && (y1 <= offsetBottom && y2 >= offsetBottom)) 
    {
        // There is an object here!
        var objectTypeOnPos = allObjects[i].getAttribute("data-type");
        if (typeof(document.getElementById("foundObject")) != 'undefined' && document.getElementById("foundObject") != null) document.getElementById("foundObject").id = "";
        allObjects[i].id = "foundObject";
       return objectTypeOnPos;
    }
  }
  return false;      
}