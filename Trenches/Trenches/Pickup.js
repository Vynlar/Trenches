var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
