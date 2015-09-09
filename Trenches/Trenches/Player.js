var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
