var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            this.game.add.tileSprite(0, 0, this.game.camera.width, this.game.camera.height);
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
