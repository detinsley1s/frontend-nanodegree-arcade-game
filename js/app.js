// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The coordinates of the enemy sprite
    // Y coord is chosen randomly from the array
    this.y = [60, 143, 226][Math.floor(Math.random() * 3)];
    this.x = -100;

    // The enemy sprite's speed chosen randomly from 100 to 799
    this.speed = Math.floor(Math.random() * 700) + 100;
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
        this.x = -100;
        this.y = [60, 143, 226][Math.floor(Math.random() * 3)];
        this.speed = Math.floor(Math.random() * 700) + 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    // The image/sprite for the player
    this.sprite = 'images/char-boy.png';

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
            if(this.y < 0) {
                this.y = 385;
                this.x = 202;
            }
            break;
        case 'down':
            // Prevents from moving off screen
            if(this.y < 385) {
                this.y += 81;
            }
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for(let i = 0; i < 3; ++i) {
    allEnemies.push(new Enemy());
}

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
