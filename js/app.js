
var speed = Math.random();
var xStart = 202;
var yStart = 405;


//Manage when player wins or loose the game
var Game = function() {
    this.gameOver = false;
    this.gameWon = false;
};

Game.prototype.reset = function() {
    player.reset();
    player.score = 0;
    //main();
};


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0; //start at the left end site
    this.y = y;
    this.speed = speed;
    this.height = 70;
    this.width = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < ctx.canvas.width) {
        this.x += (this.speed * dt);
    } else {
        //bug enters again
        this.x = 0;
        this.x += (this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, lives) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.height = 70;
    this.width = 70;
    this.sprite = 'images/char-cat-girl.png';
    this.x = xStart;
    this.y = yStart;
    this.lives = 3;
    this.score = 0;
    this.items = 0;
};

Player.prototype.update = function() {
    this.x;
    this.y;

};

Player.prototype.reset = function() {
    this.x = xStart;
    this.y = yStart;
};

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x > this.width) {
                this.x -= 101;
            }
            //Once reached the water, player can stay in the water as much as she likes
            //As soon the player wants to move, she's obliged to move to start position
            if (this.y < this.height) {
                this.reset();
            }
            break;
        case 'right':
            if (this.x + 101 < 505 - this.width) {
                this.x += 101;
            }
            if (this.y < this.height) {
                this.reset();
            }
            break;
        case 'up':
            if (this.y > this.height) {
                this.y -= 83;
            } else {
                this.score += 100;
                //console.log(this.score);
                $header.prepend(this.score);
                if (this.score === 1200 && this.items === 2) {
                    newGame.gameWon === true;
                    this.x = 202 + this.width;
                    this.y = 200;
                    alert('You have found your Valentine');
                    alert('Press enter to restart the game');
                } else {
                    this.reset();
                }
            }
            break;
        case 'down':
            if (this.y + 83 < 498 - this.height) {
                this.y += 83;
            }
            if (this.y < this.height) {
                this.reset();
            }
            break;
        case 'enter':
            //QUESTION: why the game is not restarting?
            //to prevent restart in case enter is pressed outside gameOver/gameWon
            if (newGame.gameOver === true || newGame.gameWon === true) {
                newGame.reset();
            }
            break;
    }
};


Player.prototype.collision = function() {
    if (this.lives > 1) {
        this.lives -= 1;
        //console.log(this.lives);
        this.reset();
    } else {
        this.lives = 0;
        //console.log(this.lives);
        //why it does not alert anything?
        newGame.gameOver === true;
        alert('Game Over');
        alert('Press enter to start again');
    }
};

Player.prototype.extraLives = function() {
    this.lives += 1;
    //console.log(this.lives);
};

Player.prototype.extraItems = function() {
    this.items += 1;
    //console.log(this.items);
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gem class
var Gem = function(x, y) {
    //the gem appear in a random position
    this.height = 70;
    this.width = 70;
    this.x = Math.floor(Math.random() * (505 - this.width));
    //gems cannot appear on water and grass
    this.y = Math.floor(Math.random() * (332 - this.height));
    if (this.y < 83) {
        this.y += 83;
    }
};

var Blugem = function(x, y) {
    Gem.call(this, x, y);
    this.sprite = 'images/gem-blu.png';
};

var Greengem = function(x, y) {
    Gem.call(this, x, y);
    this.sprite = 'images/gem-green.png';
};

var Orangegem = function(x, y) {
    Gem.call(this, x, y);
    this.sprite = 'images/gem-orange.png';
};

Blugem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Greengem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Orangegem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Blugem.prototype.reset = function() {
    //Make the gem disappear out of the canvas
    this.y = -200;
};

Greengem.prototype.reset = function() {
    //Make the gem disappear out of the canvas
    this.y = -200;
};

Orangegem.prototype.reset = function() {
    //Make the gem disappear out of the canvas
    this.y = -200;
};

Gem.prototype.update = function() {
    this.x;
    this.y;
};

/*In this case subclasses seem not needed
Blugem.prototype.update = function () {
    this.y;
}
Greengem.prototype.update = function () {
    this.y;
}
Orangegem.prototype.update = function () {
    this.y;
}*/

//Item class
var Item = function(x, y) {
    //the item can appear in a random position, but not in water or where there is a gem
    this.height = 70;
    this.width = 70;
    this.x = Math.floor(Math.random() * (505 - this.width));
    this.y = Math.floor(Math.random() * (498 - this.height));
    if (this.y < 83) {
        this.y += 83;
    }
};

var Key = function(x, y) {
    Item.call(this, x, y);
    this.sprite = 'images/key.png';
};

Key.prototype.move = function(x, y) {
    //make the heart move 1 box on the right or left in case with gem collision
    if (this.x > this.width) {
        this.x -= 101;
    } else {
        this.x += 101;
    }
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Key.prototype.reset = function(x, y) {
    //make the key appears left above the canvas
    this.x = 0;
    this.y = -83;
};

var Heart = function(x, y) {
    Item.call(this, x, y);
    this.sprite = 'images/heart.png';
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Heart.prototype.move = function(x, y) {
    //make the heart move 1 box on the right or left in case with gem collision
    if (this.x > this.width) {
        this.x -= 101;
    } else {
        this.x += 101;
    }
};

Heart.prototype.reset = function(x, y) {
    //make the heart appear next to key
    this.x = 101;
    this.y = -83;
};

Item.prototype.update = function(x, y) {
    this.x;
    this.y;
};
//Valentine object: the aim of the game
var Valentine = function(x, y) {
    this.x = 202 - this.width;
    this.y = 200;
    this.sprite = 'images/char-boy.png';
};

Valentine.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
for (var i = 1; i < 4; i++) {
    allEnemies.push(new Enemy(this.x, (i * 83) - 20, this.speed * 100 * i));
}
// Place the player object in a variable called player
var player = new Player();

// Place the gem objects in their variables called colorGem
var gem = new Gem();
var bluGem = new Blugem();
var greenGem = new Greengem();
var orangeGem = new Orangegem();

//Place the item obejcts in their variables called item, key and heart
var item = new Item();
var key = new Key();
var heart = new Heart();

//Place the beloved one in a variable called valentine
var valentine = new Valentine();

//Start new game
var newGame = new Game();

//Score appears out of canvas
//$header.prepend(player.score);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
