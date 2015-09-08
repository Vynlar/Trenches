module Trenches {
    export class Game extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);
            
            this.state.add('boot', Boot, false);
            this.state.add('load', Load, false);
            this.state.add('play', Play, false);

            this.state.start('boot');
        }
    }
}