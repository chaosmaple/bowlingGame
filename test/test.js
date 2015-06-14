/*jshint asi: true*/

var Game = require('../bowling')
var expect = require('expect.js')

describe('bowling game test suite:', function() {
    
    describe('test the game class', function() {
        it('game class should be defined', function() {
            expect(Game).to.be.a(Function)
        })
        it('Game should can roll balls', function() {
            var game = new Game()
            expect(game.roll).to.be.a(Function)
        })
        it('roll 0 = 0', function() {
            var game = new Game()
            game.roll(0)
            expect(game.score).to.be(0)
        })
        it('roll 5 = 5', function() {
            var game = new Game()
            game.roll(5)
            expect(game.score).to.be(5)
        })
    })
    
    describe('need 2 rounds', function() {
        it('roll 4 + 5 = 9', function() {
            var game = new Game()
            game.roll(4)
            game.roll(5)
            expect(game.score).to.be(9)
        })
    })
    
    describe('need frame', function() {
        it('normal roll 4 + 5 + 3 + 5', function() {
            var game = new Game()
            game.roll(4)
            game.roll(5)
            game.roll(3)
            game.roll(5)
            expect(game.score).to.be(17)
        })
        it('spare roll 4 + 6 + 4 + 3', function() {
            var game = new Game()
            game.roll(4)
            game.roll(6)
            game.roll(4)
            game.roll(3)
            expect(game.score).to.be(21)
        })
        it('strike roll 10 + 4 + 2', function() {
            var game = new Game()
            game.roll(10)
            game.roll(4)
            game.roll(2)
            expect(game.score).to.be(22)
        })
    })
    
    describe('more than 2 frames', function() {
        it('2 strikes 10 + 10 + 4 + 5', function() {
            var game = new Game()
            game.roll(10)
            game.roll(10)
            game.roll(4)
            game.roll(5)
            expect(game.score).to.be(52)
        })
        it('3 strikes 10 + 10 + 10 + 4 + 6 + 3 + 4', function() {
            var game = new Game()
            game.roll(10)
            game.roll(10)
            game.roll(10)
            game.roll(4)
            game.roll(6)
            game.roll(3)
            game.roll(4)
            expect(game.score).to.be(94)
        })
    })
    
    describe('the last frame', function() {
        it('roll 10frames', function() {
            var game = new Game()
            for (var i = 0; i < 18; i++) {
                game.roll(0)
            }
            game.roll(4)
            game.roll(3)
            expect(game.score).to.be(7)
        })
        it('last frame is spare', function() {
            var game = new Game()
            for (var i = 0; i < 18; i++) {
                game.roll(0)
            }
            game.roll(4)
            game.roll(6)
            game.roll(3)
            expect(game.score).to.be(13)
        })
        it('last frame is strike', function() {
            var game = new Game()
            for (var i = 0; i < 18; i++) {
                game.roll(0)
            }
            game.roll(10)
            game.roll(3)
            game.roll(4)
            expect(game.score).to.be(17)
        })
        it('last 2 frames is strike', function() {
            var game = new Game()
            for (var i = 0; i < 16; i++) {
                game.roll(0)
            }
            game.roll(10)
            game.roll(10)
            game.roll(10)
            game.roll(10)
            console.log(game.frames)
            expect(game.score).to.be(60)
        })
    })
})

