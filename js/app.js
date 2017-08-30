// Enemies our player must avoid
let Enemy = function(player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Initialize coordinates and speed of the enemy sprite
    this.reset();

    // Reference to the player instance
    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Cycle the sprites back to the left once they leave the
    // right side of the screen, so that there is no need to destroy
    // them and instantiate new sprites
    // Also, change their speeds to add variety
    if(this.x > 505) {
        this.reset();
    }

    // Check for collision with player
    this.checkForCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if an enemy has collided with the Player
Enemy.prototype.checkForCollisions = function() {
    if(this.y >= this.player.y - 3 && this.y <= this.player.y + 3 && this.x >= this.player.x - 5 && this.x <= this.player.x + 5) {
        this.player.x = 202;
        this.player.y = 385;
    }
};

// Places the enemy at a random row with a random speed
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = [60, 143, 226][Math.floor(Math.random() * 3)];
    this.speed = Math.floor(Math.random() * 700) + 100;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    // array of possible character sprites
    this.sprites = ['images/char-boy.png',
                    'images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-pink-girl.png',
                    'images/char-princess-girl.png'];

    // index of player's sprite
    this.sprite_idx = 0;

    // The image/sprite for the player
    this.sprite = this.sprites[this.sprite_idx];

    // The coordinates of the player sprite
    this.y = 385;
    this.x = 202;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.reset = function() {
    if(this.y < 0) {
        this.y = 385;
        this.x = 202;
    }
};

// Process the player's keyboard input to move
// the player's sprite on the screen
Player.prototype.handleInput = function(input) {
    switch(input) {
        case 'left':
            // Prevents from moving off screen
            if(this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            // Prevents from moving off screen
            if(this.x < 404) {
                this.x += 101;
            }
            break;
        case 'up':
            this.y -= 81;

            // If the player reaches the water
            this.reset();
            break;
        case 'down':
            // Prevents from moving off screen
            if(this.y < 385) {
                this.y += 81;
            }
            break;
        case 'ctrl':
            // changes character sprite
            // uses modulus on the sprites array's length as
            // insurance to prevent indexing errors in case
            // the array is lengthened or shortened in the future
            this.sprite_idx = (this.sprite_idx + 1) % this.sprites.length;
            this.sprite = this.sprites[this.sprite_idx];
            break;
        default:
            break;
    }
};

let player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for(let i = 0; i < 3; ++i) {
    allEnemies.push(new Enemy(player));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        17: 'ctrl',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
