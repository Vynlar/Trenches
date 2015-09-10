module Trenches {
    export class Ground extends Phaser.TileSprite {

        constructor(game: Phaser.Game) {
            super(game, 0, 0, game.camera.width, game.camera.height, 'ground');
            game.add.existing(this);
        }

        update() {
            this.x = this.game.camera.x;
            this.y = this.game.camera.y;
            this.tilePosition.x = -this.game.camera.x;
            this.tilePosition.y = -this.game.camera.y;
        }
    }

    export class Map {

        grid: Phaser.Sprite[][];
        tileHeight: number = 32;
        tileWidth: number = 32;
        tileGroup: Phaser.Group;

        constructor(private game: Phaser.Game, private width: number, private height: number) {
            this.initGrid(width);
            this.tileGroup = game.add.group();
            this.tileGroup.enableBody = true;
            this.generate();
        }

        update(player: Player) {
            this.game.physics.arcade.collide(player, this.tileGroup);
        }

        initGrid(width: number) {
            this.grid = [];
            for (var i = 0; i < width; i++) {
                this.grid[i] = [];
            }
        }

        generate() {
            this.generateTunnel(1, 10, 2, 80, 0);
        }

        generateTunnel(y: number, max: number, deviation: number, length: number, startingX: number) {
            //percent chance that the wall will go up or down
            var bumpiness: number = 80;
            var top: number = y;
            var bottom: number = y + max;

            for (var x = startingX; x < length; x++) {
                //check top
                top = this.randomizeWall(top, bumpiness, deviation, y, y + deviation);
                //chek bottom
                bottom = this.randomizeWall(bottom, bumpiness, deviation, (y + max) - deviation, y + max);

                for (var i = y-1; i <= max + y +1; i++) {
                    //create the tiles for each
                    console.log(top + " " + bottom + " " + x + " " + i);
                    if (i <= top || i >= bottom) {
                        this.grid[x][i] = this.tileGroup.create(x * this.tileWidth, i * this.tileHeight, 'ground');
                        this.grid[x][i].body.immovable = true;
                        console.log("created!");
                    }
                }
            }
        }

        randomizeWall(location: number, bumpiness: number, deviation: number, min: number, max: number) {
            var random = this.game.rnd.integerInRange(1, 100);
            if (random <= bumpiness / 2) {
                //go up
                if (location >= min) {
                    //good to go up
                    location--;
                } else {
                    location++;
                }
            } else if (random <= bumpiness) {
                //go down
                if (location <= max) {
                    //good to go down
                    location++;
                } else {
                    location--;
                }
            }
            return location;
        }
    }
}