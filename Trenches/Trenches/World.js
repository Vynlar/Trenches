var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Trenches;
(function (Trenches) {
    var Ground = (function (_super) {
        __extends(Ground, _super);
        function Ground(game) {
            _super.call(this, game, 0, 0, game.camera.width, game.camera.height, "ground");
            game.add.existing(this);
        }
        Ground.prototype.update = function () {
            this.x = -this.game.camera.x;
            this.y = -this.game.camera.y;
        };
        return Ground;
    })(Phaser.TileSprite);
    Trenches.Ground = Ground;
})(Trenches || (Trenches = {}));
