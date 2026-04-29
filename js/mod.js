let modInfo = {
	name: "The Maple Tree",
	author: "MapleGuy20",
	pointsName: "Maple Fragments",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0.1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.038",
	name: "the update where i learned new stuff.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.038</h3><br>
		- made 3 tabs for maple points (main, milestones and info)<br>
		- fixed a bug where maple point milestone 1 broke the game.<br>
		- added milestones.<br>
		- lowered the price of maple power as i will actually start working on it soon enough.<br> 
		- i still cant figure out how to make upgrade 21 (6) work.<br>`
let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('m', 11)) gain = gain.times(2.2)
	if (hasUpgrade('m', 12)) gain = gain.times(upgradeEffect('m', 12))
    if (hasUpgrade('m', 14)) gain = gain.times(1.75)
	if (hasUpgrade('m', 15)) gain = gain.times(5)
	if (hasUpgrade('m', 22)) gain = gain.times(10)
	if (hasUpgrade('m', 23)) gain = gain.times(1.01) // this is a filler upgrade, the boost is shit
	if (hasUpgrade('m', 25)) gain = gain.times(upgradeEffect('m', 25))
	if (hasUpgrade('m', 32)) gain = gain.times(0.95)// this upgrade nerfs you intentionally, the next upgrades make up for it
	if (hasUpgrade('m', 34)) gain = gain.times(144)
	// this is a separator inbetween maple points and maple power	
	if (hasUpgrade('mp', 11)) gain = gain.times(5)
	// milestone separator
	if (hasMilestone('m', 11)) gain = gain.times(55)	
		return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e10000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}