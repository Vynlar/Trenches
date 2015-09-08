module Trenches {
    export class Player extends Phaser.Sprite {

        private upKey: Phaser.Key;
        private leftKey: Phaser.Key;
        private downKey: Phaser.Key;
        private rightKey: Phaser.Key;
        private friction: number;
        public speed: number;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'diamond');

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

        update() {
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
        }

        public changeSpeed(speed: number) {
            this.speed += speed;
        }
    }
} 