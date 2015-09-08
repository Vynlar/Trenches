module Trenches {
    export class Play extends Phaser.State {
        player: Player;
        upgrade: Pickup;
        upgrades: Phaser.Group;

        preload() {
            
        }

        create() {
            this.player = new Player(this.game, 100, 100);

            this.upgrades = this.game.add.group();

            this.upgrade = new SpeedUpgrade(this.game, 300, 300);
            this.upgrades.add(this.upgrade);
            this.upgrade = new SizeUpgrade(this.game, 400, 300);
            this.upgrades.add(this.upgrade);
            this.upgrade = new SpeedUpgrade(this.game, 300, 400);
            this.upgrades.add(this.upgrade);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.upgrades, (player, upgrade) => {
                upgrade.pickup(player);
            });
        }
    }
}