module Trenches {
    export class Pickup extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, image: string) {
            super(game, x, y, image);

            game.physics.enable(this);
            game.add.existing(this);
        }
    }

    export interface PickupInterface extends Pickup {
        pickup(player: Player): void;
    }

    export class SpeedUpgrade extends Pickup implements PickupInterface {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'firstAid');
        }

        pickup(player: Player) {
            player.changeSpeed(30);

            var speedTo = this.game.add.tween(player);
            speedTo.to({
                speed: 50
            }, 2000, Phaser.Easing.Linear);
            speedTo.start();


            this.kill();
        }
    }

    export class SizeUpgrade extends Pickup implements PickupInterface {s

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'firstAid');

            this.scale.setTo(1.5, 1.5);
        }

        pickup(player: Player) {
            var scaleTo = this.game.add.tween(player.scale);
            scaleTo.to({
                x: 2,
                y: 2
            }, 1000, Phaser.Easing.Quartic.Out);
            scaleTo.start();
            this.kill();
        }
    }
} 