var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            this.game.state.start('play', true, false);
        };
        return Load;
    })(Phaser.State);
    Trenches.Load = Load;
})(Trenches || (Trenches = {}));
