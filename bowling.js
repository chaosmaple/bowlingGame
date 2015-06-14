/*jshint asi: true*/

// Game class
// param state there will be how much Frame in a game
var Game = function(frameNum) {
    this.score = 0
    this.frames = []
    this.frameNum = frameNum || 10
}

//Frame class
var Frame = function(order, totalFrame) {
    this.score = 0
    this.rounds = []
    this.order = order
    this.totalFrame = totalFrame
}

//Frame's methods
Frame.prototype.roll = function(balls) {
    this.score += balls
    this.rounds.push(balls)
}

Frame.prototype.finished = function() {
    return this.rounds[0] === 10 || this.rounds.length === 2
}

Frame.prototype.spare = function() {
    //fixme -- when you bonus this, this frame's score will change
    //so the spare methods would return false.
    return this.rounds.length === 2 && this.rounds[0] + this.rounds[1] === 10
}

Frame.prototype.strike = function() {
    return this.rounds[0] === 10
}

Frame.prototype.isLastFrame = function() {
    return this.order === this.totalFrame
}

//Game's methods
//TODO --
//simplify this logic
Game.prototype.roll = function(balls) {
    //so if this is the last frame,
    //you dont need to new a frame
    if (!this.frame || this.frame.finished() && !this.frame.isLastFrame()) {
        //whatever, this is the first roll in this frame
        //so bonus the previous frame here
        this.prev2 = this.prev
        this.prev = this.frame
        this.frame = new Frame(this.frames.length + 1, this.frameNum)
        this.frames.push(this.frame)
        
        //bonus previous
        if (this.prev && this.prev.spare()) {
            this.prev.score += balls
        }
        if (this.prev && this.prev.strike()) {
            this.prev.score += balls
            if (this.prev2 && this.prev2.strike()) {
                this.prev2.score += balls
            }
        }
    } else {
        //when you need to roll the second round in this frame
        //you will go in this branch
        if (this.frame.isLastFrame()) {
            if (this.frame.rounds.length === 0) {
                if (this.prev && this.prev.spare()) {
                    this.prev.score += balls
                }
                if (this.prev && this.prev.strike()) {
                    //bonus the previous frame
                    this.prev.score += balls
                    if (this.prev2 && this.prev2.strike()) {
                        this.prev2.score += balls
                    }
                }
            }
            if (this.frame.rounds.length === 1) {
                if (this.prev && this.prev.strike()) {
                    //bonus the previous frame
                    this.prev.score += balls
                }
            }
        } else {
            if (this.prev && this.prev.strike()) {
                //bonus the previous frame
                this.prev.score += balls
            }
        }
    }
    this.frame.roll(balls)
    this.score = this.frames.reduce(function(prev, curr) { return prev + curr.score}, 0)
}

module.exports = Game