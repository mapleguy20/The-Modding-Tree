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
        if (hasUpgrade('m', 24)) mult = mult.times(1.01) // haha another filler to piss you off
        if (hasUpgrade('m', 31)) mult = mult.times(upgradeEffect('m', 31))
        if (hasUpgrade('m', 33)) mult = mult.times(upgradeEffect('m', 33))
        if (hasUpgrade('m', 34)) mult = mult.times(0.7) // you do get 1200x maple fragments gain in exchange for this nerf
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
            unlocked() {return hasUpgrade(this.layer, 11)},
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
            unlocked() {return hasUpgrade(this.layer, 12)},
        },
        14: {
            title:  "double boost?!?",
            description: "1.5x maple fragment gain and 2x maple point gain.",
            cost: new Decimal(22),
            unlocked() {return hasUpgrade(this.layer, 13)},
            
        },
        15: {
            title:  "the row 1 finisher",
            description: "5x maple fragment gain, upgrades will get more expensive from here on.",
            cost: new Decimal(100),
            unlocked() {return hasUpgrade(this.layer, 14)},
        },
        21: {
            title:  "ah yes, an another row, isnt this great?",
            description: "maple fragments boost themselves (this currently doesnt work because i dont fucking know how to make it work).",
            cost: new Decimal(560),
            unlocked() {return hasUpgrade(this.layer, 15)},
            
        },
        22: {
            title:  "we love inflation, dont we?",
            description: "10x maple fragments and 3.25x maple points.",
            cost: new Decimal(3000),
            unlocked() {return hasUpgrade(this.layer, 21)},
        },
        23: {
            title:  "the first filler of many",
            description: "1.01x maple fragments, the worst upgrade so far.",
            cost: new Decimal(35000),
            unlocked() {return hasUpgrade(this.layer, 22)},
        },
        24: {
            title:  "i sure do like filler upgrades",
            description: "for good measure, gain 1.01x maple points. you will need it.",
            cost: new Decimal(40000),
            unlocked() {return hasUpgrade(this.layer, 23)},
        },
        25: {
            title:  "ending off this row of inflation and filler...",
            description: "maple fragments boost maple point gain again, but this time the boost is weakened.",
            cost: new Decimal(66666),
            effect() {
            return player[this.layer].points.add(1).pow(0.4)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }, // Add formatting to the effect
            unlocked() {return hasUpgrade(this.layer, 24)},
        },
        31: {
            title:  "can we stop weakening boosts now?",
            description: "maple points boost maple fragment gain again, but this time the boost is weakened.",
            cost: new Decimal(600000),
             effect() {
            return player.points.add(1).pow(0.1)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }, // Add formatting to the effect
            unlocked() {return hasUpgrade(this.layer, 25)},
        },
        32: {
            title:  "reward for suffering through weak boosts",
            description: "maple fragments boost maple point gain yet again, but this time the boost is way weaker.",
            cost: new Decimal(2e7),
            effect() {
            return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }, // Add formatting to the effect
            unlocked() {return hasUpgrade(this.layer, 31)},
        },
        33: {
            title:  "we do some more buffs",
            description: "maple points boost maple fragment gain again, but this time the boost is way weaker.",
            cost: new Decimal(2.5e17),
             effect() {
            return player.points.add(1).pow(0.1)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }, // Add formatting to the effect
            unlocked() {return hasUpgrade(this.layer, 32)},
        },
        34: {
            title:  "insult to injury",
            description: "1200x maple fragment gain, but /0.7 maple point gain.",
            cost: new Decimal(1e75),
            unlocked() {return hasUpgrade(this.layer, 33)},
        }
    },
});
addLayer("mp", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#f09c6c",                       // The color for this layer, which affects many elements.
    resource: "maple power",            // The name of this layer's main prestige resource.
    symbol: "MPOW", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "maple points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e10000),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        
    },
})