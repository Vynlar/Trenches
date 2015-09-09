module Trenches {
    export class Load extends Phaser.State {

        logo: Phaser.Sprite;

        preload() {
            this.game.load.image('diamond', 'assets/diamond.png');
            this.game.load.image('firstAid', 'assets/firstaid.png');
            this.game.load.image('ground', 'assets/ground.png');
        }

        create() {
            this.logo = this.add.sprite(this.game.camera.width / 2, this.game.camera.height/ 2, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.game.time.events.add(Phaser.Timer.SECOND, function () {
                this.game.state.start('play', true, false);
            }, this);
        }
    }
}