import { generateId } from "../utilities/utilities";

class ChessPiece {

    constructor(position, player) {
        this.id = generateId();
        this.position = position;
        this.player = player;
        this.pieceToBeCaptured = false;
    };

    updatePosition = (newPos) => {
        this.position = newPos;
    };
};

export class Pawn extends ChessPiece {

    getPossibleMovements = (fieldObj) => {
        let [x, y] = [ ...this.position ];
        let possibles = [
            [x - 1, y - 1],
            [x + 1, y - 1]
        ];
        return possibles;
    };
};

export class Tower extends ChessPiece {

    getPossibleMovements = () => {
        let [x, y] = [...this.position];
        let possible = [];
        for (let i = 0; i < 8; i++) {
            try {
                possible.push()
            } catch {}
        }
    }
}