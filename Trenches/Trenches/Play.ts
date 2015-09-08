module Trenches {
    export class Play extends Phaser.State {
        player: Player;
        upgrade: Upgrade;
        upgrades: Phaser.Group;

        preload() {
            
        }

        create() {
            this.player = new Player(this.game, 100, 100);

            this.upgrades = this.game.add.group();

            this.upgrade = new Upgrade(this.game, 300, 300);
            this.upgrades.add(this.upgrade);
            this.upgrade = new Upgrade(this.game, 400, 300);
            this.upgrades.add(this.upgrade);
            this.upgrade = new Upgrade(this.game, 300, 400);
            this.upgrades.add(this.upgrade);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.upgrades, (player, upgrade) => {
                player.changeSpeed(10);
                player.scale.setTo(1.3, 1.3);
                upgrade.kill();
            });

        }
    }
}