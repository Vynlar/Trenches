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
        };
        Load.prototype.create = function () {
            this.logo = this.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.game.state.start('play', true, false);
        };
        return Load;
    })(Phaser.State);
    Trenches.Load = Load;
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
            this.player = new Trenches.Player(this.game, 100, 100);
            this.upgrades = this.game.add.group();
            this.upgrade = new Trenches.SpeedUpgrade(this.game, 300, 300);
            this.upgrades.add(this.upgrade);
            this.upgrade = new Trenches.SizeUpgrade(this.game, 400, 300);
            this.upgrades.add(this.upgrade);
            this.upgrade = new Trenches.SpeedUpgrade(this.game, 300, 400);
            this.upgrades.add(this.upgrade);
        };
        Play.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.upgrades, function (player, upgrade) {
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
    var Pickup = (function (_super) {
        __extends(Pickup, _super);
        function Pickup(game, x, y, image) {
            _super.call(this, game, x, y, image);
            game.physics.enable(this);
            game.add.existing(this);
        }
        return Pickup;
    })(Phaser.Sprite);
    Trenches.Pickup = Pickup;
    var SpeedUpgrade = (function (_super) {
        __extends(SpeedUpgrade, _super);
        function SpeedUpgrade(game, x, y) {
            _super.call(this, game, x, y, 'firstAid');
        }
        SpeedUpgrade.prototype.pickup = function (player) {
            player.changeSpeed(30);
            var speedTo = this.game.add.tween(player);
            speedTo.to({
                speed: 50
            }, 2000, Phaser.Easing.Linear);
            speedTo.start();
            this.kill();
        };
        return SpeedUpgrade;
    })(Pickup);
    Trenches.SpeedUpgrade = SpeedUpgrade;
    var SizeUpgrade = (function (_super) {
        __extends(SizeUpgrade, _super);
        function SizeUpgrade(game, x, y) {
            _super.call(this, game, x, y, 'firstAid');
            this.scale.setTo(1.5, 1.5);
        }
        SizeUpgrade.prototype.pickup = function (player) {
            var scaleTo = this.game.add.tween(player.scale);
            scaleTo.to({
                x: 2,
                y: 2
            }, 1000, Phaser.Easing.Quartic.Out);
            scaleTo.start();
            this.kill();
        };
        return SizeUpgrade;
    })(Pickup);
    Trenches.SizeUpgrade = SizeUpgrade;
})(Trenches || (Trenches = {}));
//# sourceMappingURL=game.js.map