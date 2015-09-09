module Trenches {
    export class Play extends Phaser.State {
        player: Player;
        upgrade: Pickup;
        pickups: Phaser.Group;
        ground: Ground;
        tileMap: Map;

        preload() {
            
        }

        create() {
            this.game.world.setBounds(0, 0, 1000, 1000);

            //this.ground = new Ground(this.game);

            this.tileMap = new Map(this.game, 80, 30);
            
            this.player = new Player(this.game, 100, 100);
            this.game.camera.follow(this.player);

            this.pickups = this.game.add.group();

            this.upgrade = new SpeedUpgrade(this.game, 300, 300);
            this.pickups.add(this.upgrade);
            this.upgrade = new SizeUpgrade(this.game, 400, 300);
            this.pickups.add(this.upgrade);
            this.upgrade = new SpeedUpgrade(this.game, 300, 400);
            this.pickups.add(this.upgrade);
        }

        update() {
            this.tileMap.update(this.player);
            //enable collisions between the player and all pickups
            this.game.physics.arcade.collide(this.player, this.pickups, (player, upgrade) => {
                upgrade.pickup(player);
            });
        }
    }
}