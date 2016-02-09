// Below are all objects that the player can encounter
// with their properties

var floorBlockStartPos = 
{
  // The block where the player starts
  canStandOn          : true,
  canGoThrough        : false,
  canSwimThrough      : false,
  isDangerousToTouch  : false,

  width               : 60,
  height              : 30,
  
  onWalk: function()
  {
    // This is what happens when the player walks over this object
  },

  onTouch: function(object_id)
  {
    // This is what happens when the player touches this object
  }
}

var floorBlockGrass = 
{
  // A standard block to walk on
  canStandOn          : true,
  canGoThrough        : false,
  canSwimThrough      : false,
  isDangerousToTouch  : false,

  width               : 30,
  height              : 30,

  onWalk: function()
  {
    // This is what happens when the player walks over this object
  },

  onTouch: function(object_id)
  {
    // This is what happens when the player touches this object
  }
}

var awardsCoin = 
{
  // A coin
  canStandOn          : false,
  canGoThrough        : true,
  canSwimThrough      : false,
  isDangerousToTouch  : false,

  width               : 60,
  height              : 60,

  onWalk: function()
  {
    // This is what happens when the player walks over this object
  },

  onTouch: function(object_id)
  {
    // This is what happens when the player touches this object
    document.getElementById("sfx").src = "sounds/coin.wav";
    document.getElementById("sfx").play();
    playerCoins++;
    document.getElementById("coins").innerHTML = playerCoins;
    var date = new Date();
    date.setTime(date.getTime()+(1000*60*60*24*365));
    document.cookie = 'coins='+             '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'coins='+playerCoins+ '; expires='+date.toGMTString()+';';
    $("img[data-id='"+object_id+"']").remove();
  }
}