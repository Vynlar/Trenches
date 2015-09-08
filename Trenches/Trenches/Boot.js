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
            console.log('testing');
            this.game.state.start('load', true, false);
        };
        return Boot;
    })(Phaser.State);
    Trenches.Boot = Boot;
})(Trenches || (Trenches = {}));
//# sourceMappingURL=Boot.js.map