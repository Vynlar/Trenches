module Trenches {
    export class Pickup extends Phaser.Sprite {

        player: Player;

        constructor(game: Phaser.Game, x: number, y: number, image: string, duration: number) {
            super(game, x, y, image);

            game.physics.enable(this);
            game.add.existing(this);
        }

        expire(player: Player) {

        }

        start(player: Player) {

        }

        pickup(player: Player) {
            this.player = player;
            this.start(player);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.expire, this);
            this.kill();
        }
    }

    export interface PickupInterface extends Pickup {
        expire(): void;
        start(): void;
    }

    export class SpeedUpgrade extends Pickup implements PickupInterface {

        speedIncrease: number = 20;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'firstAid', 5);
        }

        start() {
            var speedTo = this.game.add.tween(this.player);
            speedTo.to({
                speed: this.player.speed + this.speedIncrease
            }, 1000);
            speedTo.onComplete.add(function () {
                console.log("done: " + this.player.speed);
            }, this);
            speedTo.start();
        }

        expire() {
            this.game.add.tween(this.player).to({
                speed: this.player.speed - this.speedIncrease
            }).start();

        }
    }

    export class SizeUpgrade extends Pickup implements PickupInterface {s

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'firstAid', 5);
        }

        start() {
            var scaleTo = this.game.add.tween(this.player.scale);
            scaleTo.to({
                x: 2,
                y: 2
            }, 1000, Phaser.Easing.Quartic.Out);
            scaleTo.start();
        }

        expire() {
            this.game.add.tween(this.player.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quartic.Out).start();
        }
    }
} 