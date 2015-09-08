module Trenches {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('logo', 'assets/phaser.png');
        }

        create() {
            this.game.state.start('load', true, false);
        }
    }
} 