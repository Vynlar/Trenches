var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
window.onload = function () {
    var game = new Trenches.Game();
};
//# sourceMappingURL=app.js.map