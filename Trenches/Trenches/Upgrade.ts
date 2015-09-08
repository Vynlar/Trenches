module Trenches {
    export class Upgrade extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'firstAid');

            game.physics.enable(this);
            game.add.existing(this);
        }
    }
} 