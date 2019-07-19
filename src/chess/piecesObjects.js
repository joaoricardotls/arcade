import { generateId } from "../utilities/utilities";

export class ChessPiece {

    constructor(position, player) {
        this.id = generateId();
        this.position = position;
        this.player = player;
        this.pieceToBeCaptured = false;
    };
};