goog.provide('Player')

goog.require('constants');
goog.require('CharacterAnimation');

Player = function(id, character, team) {
	this.id = id;
	this.character = character;
	this.team = team;

	this.x = 0;
	this.y = 0;
	this.walking = false;
	this.attacking = false;
	this.direction = constants.directions.right;
	this.directionX = 1;
	this.directionY = 0;

	this.sprite = new lime.Sprite();
	this.animation = new CharacterAnimation(character, team).setDirection(this.direction);
	this.sprite.runAction(this.animation);
};

Player.prototype.addToScene = function() {
	console.log(this);
	playersLayer.appendChild(this.sprite);
};

Player.prototype.removeFromScene = function() {
	playersLayer.removeChild(this.sprite);
};

Player.prototype.setDirection = function(x, y) {
	this.walking = (x != 0 || y != 0);
	this.directionX = x;
	this.directionY = y;

	this.animation.setWalking(this.walking);
	
	if (this.walking) {
		var norm = Math.sqrt(x*x + y*y);
		this.directionX /= norm;
		this.directionY /= norm;
		
		if (x > 0 && Math.abs(x) >= Math.abs(y)) {
			this.direction = constants.directions.right;
		} else if (x < 0 && Math.abs(x) >= Math.abs(y)) {
			this.direction = constants.directions.left;
		} else if (y > 0) {
			this.direction = constants.directions.down;
		} else {
			this.direction = constants.directions.up;
		}
		this.animation.setDirection(this.direction);
	}
};

Player.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite.setPosition(x, y);
};

Player.prototype.update = function(dt) {
	if (this.walking) {
		this.x += this.directionX * constants.characterSpeed * dt;
		this.y += this.directionY * constants.characterSpeed * dt;
		this.sprite.setPosition(this.x, this.y);
	}
};
