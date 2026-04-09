addLayer("m", {
    name: "maple points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffd900",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "maple points", // Name of prestige currency
    baseResource: "maple fragments", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        if (hasUpgrade('m', 14)) mult = mult.times(2)
        if (hasUpgrade('m', 22)) mult = mult.times(3.25)    
            return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for maple points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "hey look its the beginning!",
            description: "double your maple fragment gain.",
            cost: new Decimal(1),
        },    
        12: { 
            title: "making stuff complicated",
            description: "maple points boost maple fragment gain.",
            cost: new Decimal(2),
            effect() {
            return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }, // Add formatting to the effect
        },
        13: {
            title: "now we do the opposite!",
            description: "maple fragments boost maple point gain.",
            cost: new Decimal(6),
            effect() {
            return player.points.add(1).pow(0.15)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }, // Add formatting to the effect
        },
        14: {
            title:  "double boost?!?",
            description: "1.5x maple fragment gain and 2x maple point gain.",
            cost: new Decimal(22),
        },
        15: {
            title:  "the row 1 finisher",
            description: "5x maple fragment gain, upgrades will get more expensive from here on.",
            cost: new Decimal(100),
        },
        21: {
            title:  "ah yes, an another row, isnt this great?",
            description: "maple fragments boost themselves (this currently doesnt work because i dont fucking know how to make it work).",
            cost: new Decimal(900),
        },
        22: {
            title:  "we love inflation, dont we?",
            description: "10x maple fragments and 3.25x maple points.",
            cost: new Decimal(3000),
        },
        23: {
            title:  "the first filler of many",
            description: "1.01x maple fragments, the worst upgrade so far.",
            cost: new Decimal(35000),
        },
    },
});