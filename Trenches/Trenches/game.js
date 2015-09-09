window.onload = function () {
    var game = new Trenches.Game();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trenches;
(function (Trenches) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('logo', 'assets/phaser.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('load', true, false);
        };
        return Boot;
    })(Phaser.State);
    Trenches.Boot = Boot;
})(Trenches || (Trenches = {}));
var Trenches;
(function (Trenches) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('boot', Trenches.Boot, false);
            this.state.add('load', Trenches.Load, false);
            this.state.add('play', Trenches.Play, false);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Trenches.Game = Game;
})(Trenches || (Trenches = {}));
var Trenches;
(function (Trenches) {
    var Load = (function (_super) {
        __extends(Load, _super);
        function Load() {
            _super.apply(this, arguments);
        }
        Load.prototype.preload = function () {
            this.game.load.image('diamond', 'assets/diamond.png');
            this.game.load.image('firstAid', 'assets/firstaid.png');
            this.game.load.image('ground', 'assets/ground.png');
        };
        Load.prototype.create = function () {
            this.logo = this.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(Phaser.Timer.SECOND, function () {
                this.game.state.start('play', true, false);
            }, this);
        };
        return Load;
    })(Phaser.State);
    Trenches.Load = Load;
})(Trenches || (Trenches = {}));
var Trenches;
(function (Trenches) {
    var Pickup = (function (_super) {
        __extends(Pickup, _super);
        function Pickup(game, x, y, image, duration) {
            _super.call(this, game, x, y, image);
            game.physics.enable(this);
            game.add.existing(this);
        }
        Pickup.prototype.expire = function (player) {
        };
        Pickup.prototype.start = function (player) {
        };
        Pickup.prototype.pickup = function (player) {
            this.player = player;
            this.start(player);
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.expire, this);
            this.kill();
        };
        return Pickup;
    })(Phaser.Sprite);
    Trenches.Pickup = Pickup;
    var SpeedUpgrade = (function (_super) {
        __extends(SpeedUpgrade, _super);
        function SpeedUpgrade(game, x, y) {
            _super.call(this, game, x, y, 'firstAid', 5);
            this.speedIncrease = 20;
        }
        SpeedUpgrade.prototype.start = function () {
            var speedTo = this.game.add.tween(this.player);
            speedTo.to({
                speed: this.player.speed + this.speedIncrease
            }, 1000);
            speedTo.onComplete.add(function () {
                console.log("done: " + this.player.speed);
            }, this);
            speedTo.start();
        };
        SpeedUpgrade.prototype.expire = function () {
            this.game.add.tween(this.player).to({
                speed: this.player.speed - this.speedIncrease
            }).start();
        };
        return SpeedUpgrade;
    })(Pickup);
    Trenches.SpeedUpgrade = SpeedUpgrade;
    var SizeUpgrade = (function (_super) {
        __extends(SizeUpgrade, _super);
        function SizeUpgrade(game, x, y) {
            _super.call(this, game, x, y, 'firstAid', 5);
        }
        SizeUpgrade.prototype.start = function () {
            var scaleTo = this.game.add.tween(this.player.scale);
            scaleTo.to({
                x: 2,
                y: 2
            }, 1000, Phaser.Easing.Quartic.Out);
            scaleTo.start();
        };
        SizeUpgrade.prototype.expire = function () {
            this.game.add.tween(this.player.scale).to({
                x: 1,
                y: 1
            }, 1000, Phaser.Easing.Quartic.Out).start();
        };
        return SizeUpgrade;
    })(Pickup);
    Trenches.SizeUpgrade = SizeUpgrade;
})(Trenches || (Trenches = {}));
var Trenches;
(function (Trenches) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
        }
        Play.prototype.preload = function () {
        };
        Play.prototype.create = function () {
            this.game.world.setBounds(0, 0, 1000, 1000);
            //this.ground = new Ground(this.game);
            this.tileMap = new Trenches.Map(this.game, 80, 30);
            this.player = new Trenches.Player(this.game, 100, 100);
            this.game.camera.follow(this.player);
            this.pickups = this.game.add.group();
            this.upgrade = new Trenches.SpeedUpgrade(this.game, 300, 300);
            this.pickups.add(this.upgrade);
            this.upgrade = new Trenches.SizeUpgrade(this.game, 400, 300);
            this.pickups.add(this.upgrade);
            this.upgrade = new Trenches.SpeedUpgrade(this.game, 300, 400);
            this.pickups.add(this.upgrade);
        };
        Play.prototype.update = function () {
            this.tileMap.update(this.player);
            //enable collisions between the player and all pickups
            this.game.physics.arcade.collide(this.player, this.pickups, function (player, upgrade) {
                upgrade.pickup(player);
            });
        };
        return Play;
    })(Phaser.State);
    Trenches.Play = Play;
})(Trenches || (Trenches = {}));
var Trenches;
(function (Trenches) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'diamond');
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.friction = 0.9;
            this.speed = 20;
            this.anchor.set(0.5, 0.5);
            game.physics.enable(this);
            game.add.existing(this);
            this.body.collideWorldBounds = true;
        }
        Player.prototype.update = function () {
            this.body.velocity.x *= this.friction;
            this.body.velocity.y *= this.friction;
            if (this.upKey.isDown) {
                this.body.velocity.y -= this.speed;
            }
            if (this.downKey.isDown) {
                this.body.velocity.y += this.speed;
            }
            if (this.leftKey.isDown) {
                this.body.velocity.x -= this.speed;
            }
            if (this.rightKey.isDown) {
                this.body.velocity.x += this.speed;
            }
        };
        Player.prototype.changeSpeed = function (speed) {
            this.speed += speed;
        };
        return Player;
    })(Phaser.Sprite);
    Trenches.Player = Player;
})(Trenches || (Trenches = {}));
var Trenches;
(function (Trenches) {
    var Ground = (function (_super) {
        __extends(Ground, _super);
        function Ground(game) {
            _super.call(this, game, 0, 0, game.camera.width, game.camera.height, 'ground');
            game.add.existing(this);
        }
        Ground.prototype.update = function () {
            this.x = this.game.camera.x;
            this.y = this.game.camera.y;
            this.tilePosition.x = -this.game.camera.x;
            this.tilePosition.y = -this.game.camera.y;
        };
        return Ground;
    })(Phaser.TileSprite);
    Trenches.Ground = Ground;
    var Map = (function () {
        function Map(game, width, height) {
            this.game = game;
            this.width = width;
            this.height = height;
            this.tileHeight = 32;
            this.tileWidth = 32;
            this.initGrid(width);
            this.tileGroup = game.add.group();
            this.tileGroup.enableBody = true;
            this.generate();
        }
        Map.prototype.update = function (player) {
            this.game.physics.arcade.collide(player, this.tileGroup);
        };
        Map.prototype.initGrid = function (width) {
            this.grid = [];
            for (var i = 0; i < width; i++) {
                this.grid[i] = [];
            }
        };
        Map.prototype.generate = function () {
            this.generateTunnel(1, 10, 2, 80, 0);
        };
        Map.prototype.generateTunnel = function (y, max, deviation, length, startingX) {
            //percent chance that the wall will go up or down
            var bumpiness = 20;
            var top = y;
            var bottom = y + max;
            for (var x = startingX; x < length; x++) {
                //check top
                top = this.randomizeWall(top, bumpiness, deviation, y, y + deviation);
                //chek bottom
                bottom = this.randomizeWall(bottom, bumpiness, deviation, (y + max) - deviation, y + max);
                for (var i = y - 1; i <= max + y + 1; i++) {
                    //create the tiles for each
                    console.log(top + " " + bottom + " " + x + " " + i);
                    if (i <= top || i >= bottom) {
                        this.grid[x][i] = this.tileGroup.create(x * this.tileWidth, i * this.tileHeight, 'ground');
                        this.grid[x][i].body.immovable = true;
                        console.log("created!");
                    }
                }
            }
        };
        Map.prototype.randomizeWall = function (location, bumpiness, deviation, min, max) {
            var random = this.game.rnd.integerInRange(1, 100);
            if (random <= bumpiness / 2) {
                //go up
                if (location >= min) {
                    //good to go up
                    location--;
                }
                else {
                    location++;
                }
            }
            else if (random <= bumpiness) {
                //go down
                if (location <= max) {
                    //good to go down
                    location++;
                }
                else {
                    location--;
                }
            }
            return location;
        };
        return Map;
    })();
    Trenches.Map = Map;
})(Trenches || (Trenches = {}));
//# sourceMappingURL=game.js.map