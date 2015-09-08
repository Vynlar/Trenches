module Trenches {
    export class Load extends Phaser.State {

        logo: Phaser.Sprite;

        preload() {
            this.game.load.image('diamond', 'assets/diamond.png');
            this.game.load.image('firstAid', 'assets/firstaid.png');
        }

        create() {
            this.logo = this.add.sprite(this.game.camera.width / 2, this.game.camera.height/ 2, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.game.state.start('play', true, false);
        }
    }
}