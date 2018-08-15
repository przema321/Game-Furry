var Furry = require('./furry.js');
var Coin = require('./coin.js');

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10)
    }
    this.showFurry = function () {
        if(this.board[ this.index(this.furry.x,this.furry.y) ] !== undefined){
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');}

    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.hideVisibleFurry=function () {

        var furryPosition = document.querySelector('.furry');
        if (furryPosition != null) {
            furryPosition.classList.remove('furry');
        }
    };

    var self = this;
    this.startGame = function () {
        this.idSetinterval = setInterval(function () {
            self.moveFurry()
        }, 250);

    };
    this.moveFurry = function () {
        this.hideVisibleFurry();
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision()
    };


    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "up";
                break;
            case 38:
                this.furry.direction = "down";
                break;
        }

    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            var pos = document.querySelector(".coin")
            pos.classList.remove("coin")
            this.score += 1;
            var scr = document.querySelector("#score strong")
            scr.innerText = this.score
            this.coin = new Coin;
            this.showCoin()
        }
    }

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetinterval);
            this.hideVisibleFurry()
            var boardId = document.querySelector('#board');
            boardId.classList.add('invisible');
            var scoreId = document.querySelector('#score');
            scoreId.classList.add('invisible');
            var overId=document.querySelector('#over');
            overId.classList.remove('invisible');
            var points=document.querySelector('#result');
            points.innerText=this.score;

        }

    }

}

module.exports = Game;