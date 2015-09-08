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
        };
        Load.prototype.create = function () {
            this.logo = this.add.sprite(this.game.camera.width / 2, this.game.camera.width / 2, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
        };
        return Load;
    })(Phaser.State);
    Trenches.Load = Load;
})(Trenches || (Trenches = {}));
//# sourceMappingURL=Load.js.map