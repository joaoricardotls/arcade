// import { generateId } from "../utilities/utilities";

export class PlayerObject {
    
    constructor(name, number) {
        this.number = number;
        this.name = name;
        this.score = {
            total: 0,
            upperTotal: 0,
            lowerTotal: 0,
            upperSection: {
                "ones": undefined,
                "twos": undefined,
                "threes": undefined,
                "fours": undefined,
                "fives": undefined,
                "sixes": undefined
            },
            lowerSection: {
                "three-in-a-row": undefined,
                "four-in-a-row": undefined,
                "full-house": undefined,
                "small-straight": undefined,
                "large-straight": undefined,
                "chance": undefined,
                "yahtzee": undefined
            }
        };

        this.setValue = {
            "ones": (dices) => {
                let ones = dices.filter(dice => dice === 1);
                if (this.score.upperSection["ones"] === undefined) {
                    this.score.upperSection["ones"] = ones.length * 1;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "twos": (dices) => {
                let twos = dices.filter(dice => dice === 2);
                if (this.score.upperSection["twos"] === undefined) {
                    this.score.upperSection["twos"] = twos.length * 2;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "threes": (dices) => {
                let threes = dices.filter(dice => dice === 3);
                if (this.score.upperSection["threes"] === undefined) {
                    this.score.upperSection["threes"] = threes.length * 3;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "fours": (dices) => {
                let fours = dices.filter(dice => dice === 4);
                if (this.score.upperSection["fours"] === undefined) {
                    this.score.upperSection["fours"] = fours.length * 4;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "fives": (dices) => {
                let fives = dices.filter(dice => dice === 5);
                if (this.score.upperSection["fives"] === undefined) {
                    this.score.upperSection["fives"] = fives.length * 5;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "sixes": (dices) => {
                let sixes = dices.filter(dice => dice === 6);
                if (this.score.upperSection["sixes"] === undefined) {
                    this.score.upperSection["sixes"] = sixes.length * 6;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "three-in-a-row": (dices) => {
                let threeInARow = 0;
                for (let i = 1; i < 7; i++) {
                    let row = dices.filter(dice => dice === i);
                    if (row.length > 2) {
                        threeInARow = dices.reduce((sum, current) => sum + current);
                    };
                };
                if (this.score.lowerSection["three-in-a-row"] === undefined) {
                    this.score.lowerSection["three-in-a-row"] = threeInARow;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "four-in-a-row": (dices) => {
                let fourInARow = 0;
                for (let i = 1; i < 7; i++) {
                    let row = dices.filter(dice => dice === i);
                    if (row.length > 3) {
                        fourInARow = dices.reduce((sum, current) => sum + current);
                    };
                };
                if (this.score.lowerSection["four-in-a-row"] === undefined) {
                    this.score.lowerSection["four-in-a-row"] = fourInARow;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "full-house": (dices) => {
                let ocurrences = [],
                    fullHouse = 0;
                for (let i = 0; i < 6; i++) {
                    ocurrences.push(dices.filter(d => d === i + 1).length);
                };
                if (ocurrences.includes(2) && ocurrences.includes(3)) {
                    fullHouse = 25;
                };
                if (this.score.lowerSection["full-house"] === undefined) {
                    this.score.lowerSection["full-house"] = fullHouse;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "small-straight": (dices) => {
                let isStraight = (arr) => {
                    let uniques = [];
                    arr.forEach(val => {
                        if (!uniques.includes(val)) {
                            uniques.push(val);
                        };
                    });
                    uniques = uniques.sort().reverse();
                    if (uniques.length === 4) {
                        let [a1, a2, a3, a4] = [ ...uniques ];
                        return a1 === a2 + 1 &&
                               a2 === a3 + 1 &&
                               a3 === a4 + 1;
                    } else if (uniques.length === 5) {
                        let [a1, a2, a3, a4, a5] = [ ...uniques ];
                        return (a1 === a2 + 1 && a2 === a3 + 1 && a3 === a4 + 1) ||
                               (a2 === a3 + 1 && a3 === a4 + 1 && a4 === a5 + 1)
                    } else {
                        return false;
                    };
                };
                let smallStraight = isStraight(dices) ? 30 : 0;
                if (this.score.lowerSection["small-straight"] === undefined) {
                    this.score.lowerSection["small-straight"] = smallStraight;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "large-straight": (dices) => {
                let isStraight = (arr) => {
                    let [a1, a2, a3, a4, a5] = [ ...arr.sort().reverse() ];
                    return a1 === a2 + 1 &&
                           a2 === a3 + 1 &&
                           a3 === a4 + 1 &&
                           a4 === a5 + 1;
                };
                let largeStraight = isStraight(dices) ? 40 : 0;
                if (this.score.lowerSection["large-straight"] === undefined) {
                    this.score.lowerSection["large-straight"] = largeStraight;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "chance": (dices) => {
                let chance = 0;
                dices.forEach(value => {chance += value});
                if (this.score.lowerSection["chance"] === undefined) {
                    this.score.lowerSection["chance"] = chance;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            },

            "yahtzee": (dices) => {
                let isYahtzee = (arr) => {
                    let [a1, a2, a3, a4, a5] = [...arr];
                    return a1 === a2 &&
                           a2 === a3 &&
                           a3 === a4 &&
                           a4 === a5;
                };
                let yahtzee = isYahtzee(dices) ? 50 : 0;
                if (this.score.lowerSection["yahtzee"] === undefined) {
                    this.score.lowerSection["yahtzee"] = yahtzee;
                    this.updateTotalScore();
                } else {
                    throw new Error("This score has already been assigned");
                };
            }
        };

        this.getUpperSectionScore = () => {
            let total = 0;
            Object.keys(this.score.upperSection).forEach(key => {
                if (this.score.upperSection[key] !== undefined) {    
                    total += this.score.upperSection[key];
                };
            });
            if (total >= 63) {
                total += 35;
            };
            return total;
        };

        this.getLowerSectionScore = () => {
            let total = 0;
            Object.keys(this.score.lowerSection).forEach(key => {
                if (this.score.lowerSection[key] !== undefined) {    
                    total += this.score.lowerSection[key];
                };
            });
            return total;
        };

        this.getTotalScore = () => {
            return this.getUpperSectionScore() + this.getLowerSectionScore();
        };

        this.updateTotalScore = () => {
            this.score.upperTotal = this.getUpperSectionScore();
            this.score.lowerTotal = this.getLowerSectionScore();
            this.score.total = this.getTotalScore();
        };











        this.setUpperSectionScore = (key, value) => {
            if (Object.keys(this.score.upperSection).includes(key)) {
                this.score.upperSection[key] = value;
            };
            this.score.upperTotal = this.getUpperSectionScore();
            this.score.total = this.getTotalScore();
        };

        this.setLowerSectionScore = (key, value) => {
            if (Object.keys(this.score.lowerSection).includes(key)) {
                this.score.lowerSection[key] = value;
            };
            this.score.lowerTotal = this.getLowerSectionScore();
            this.score.total = this.getTotalScore();
        };
    };
};