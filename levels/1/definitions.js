/// <summary>
///		Every level file uses standard alphabet characters (A-Z, case-sensitive) to build a level.
///		This file is used to translate these characters to their sprite and JS object.
///		For example, if you'd like the 'A' to represent waterblock.jpg and the object floorBlockWater,
///		you would write this:
///
///		'A' : 
///		{
///			'sprite' 		: 'waterblock.jpg',
///			'objectName' 	: 'floorBlockWater'
///		}
///
///		If you don't want a sprite to appear somewhere in your level (like when you just want 
///		normal air where the player can walk and jump through) you can use a space.
///
///		Remember to always enter a sprite AND an objectname below for every character 
///		and make sure both actually exist or your level will not be created correctly.
///		Also, a starting position of the level must always be included. The character 
///		you choose for it doesn't matter but the objectName must be 'floorBlockStartPos'
/// </summary>

var level = 
{
	'A' : 
	{
		'sprite' 		: 'startPos.jpg',
		'objectName' 	: 'floorBlockStartPos'
	},
	'B' : 
	{
		'sprite' 		: 'stdBlock.png',
		'objectName' 	: 'floorBlockGrass'
	},
	'C' :
	{
		'sprite' 		: 'coin.png',
		'objectName' 	: 'rewardsCoin'
	}
};

// What is the starting height in pixels for the player sprite?
// Or in other words: how much pixels above the main game window 
// is the bottom of the player sprite located?
var startBottom = 31;
// Same for the left position
var startLeft = 510;

// Set the max jump height. This value is multiplied by the height of the sprite to calculate the jump height
var jumpHeight = 2.5;

// How many seconds does the player have to finish the level?
var startTime = 999;

// Find the folder where this file is located
var scripts = document.getElementsByTagName("script"),
	src = scripts[scripts.length-1].src;
var dir = src.substring(0, src.lastIndexOf('/'));
var path = dir.split('levels');
path = path[1];
path = "levels/"+path.substring(1,path.length)+"/";

// Do you have a soundtrack (mp3 format) for this level? If so, please enter it here
var soundTrack = path+"soundtrack.mp3";