const gameButtons = document.querySelectorAll('.push');
const startBtn = document.querySelector('#start');
const strictBtn = document.querySelector('#strict');
const strictLED = document.querySelector('.strict-led');
const display = document.querySelector('#counter');
const buttonsObj = [{
    button: document.querySelector('#green'),
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    idx: document.querySelector('#green').dataset.idx,
    active: 'green-active'
  },
  {
    button: document.querySelector('#red'),
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    idx: document.querySelector('#red').dataset.idx,
    active: 'red-active'
  },
  {
    button: document.querySelector('#yellow'),
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    idx: document.querySelector('#yellow').dataset.idx,
    active: 'yellow-active'
  },
  {
    button: document.querySelector('#blue'),
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    idx: document.querySelector('#blue').dataset.idx,
    active: 'blue-active'
  }
];

let gameOn = false;
let gameStart = false;
let strict = false;
let counter = 0;
let playerCounter = 0;
let playerMoves = [];
let computerMoves = [];
let delay = 1000;
let turn = false;

function is_touch_device() {
  return 'ontouchstart' in window  ||      // works on most browsers
          navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

Array.from(gameButtons).forEach(buttons => {
  if (is_touch_device) {
    buttons.addEventListener('touchstart', simonGame);
    console.log('mobile device detected');
  } else {
    buttons.addEventListener('click', simonGame);
    console.log('not a touch screen');
  }

});

// General button behavior (sounds, active state, delay)
function buttonFunc(eventVar, soundVar, activeClass) {
  playSound(soundVar);
  eventVar.classList.add(activeClass);
  setTimeout(function() {
    eventVar.classList.remove(activeClass);
  }, 250);
}

function simonGame(e) {

  if (gameOn) {

    let buttonID = e.target.dataset.idx;

    if (turn) {
      if (e.target.id === 'green') {
        buttonFunc(e.target, buttonsObj[0].sound, buttonsObj[0].active);
      }
      if (e.target.id === 'red') {
        buttonFunc(e.target, buttonsObj[1].sound, buttonsObj[1].active);
      }
      if (e.target.id === 'yellow') {
        buttonFunc(e.target, buttonsObj[2].sound, buttonsObj[2].active);
      }
      if (e.target.id === 'blue') {
        buttonFunc(e.target, buttonsObj[3].sound, buttonsObj[3].active);
      }

      playerMove(buttonID);

      if (playerMoves.length === computerMoves.length && gameStart === true) {
        playerCounter++;
        console.log('player counter:', playerCounter);
        if (playerCounter !== 20) {
          setTimeout(function() {
            computerMove();
          }, delay);
        } else {
          winnerMsg();
        }
      }
    }

    // compare player and computer moves
    arraysEqual(playerMoves, computerMoves);

  }
}

function playSound(e) {
  e.play();
}

function updateCount() {
  counter++;
  display.innerHTML = counter;
}

function computerRandom() {

  // generate a random number to be used to select a random button index
  let rand = Math.floor(Math.random() * 4);

  // select a random button every time computerMove() loads; delay the move so it doesn't happen instantly
  setTimeout(function() {
    buttonFunc(buttonsObj[rand].button, buttonsObj[rand].sound, buttonsObj[rand].active);
    computerMoves.push(buttonsObj[rand].idx);
    console.log('computer moves:', computerMoves);
    if (counter === 0) {
      updateCount();
      console.log('counter:', counter);
    }
    turn = true;
    console.log('turn:', turn);
  }, delay);
}

function computerMove() {

  if (gameStart) {
    playerMoves = [];

    let offset = 0;
    turn = false;
    console.log('turn:', turn);
    if (counter > 0) {
      updateCount();
      console.log('counter:', counter);
    }

    computerMoves.forEach(function(e) {
      setTimeout(function() {
        buttonFunc(buttonsObj[e].button, buttonsObj[e].sound, buttonsObj[e].active);
      }, delay + offset);
      offset += delay;
    });

    setTimeout(function() {
      computerRandom();
    }, offset);

  }
}

function playerMove(id) {

  playerMoves.push(id);
  console.log('player moves:', playerMoves);

}

function fail() {
  console.log('fail');
  gameStart = false;
  if (strict) {
    display.innerHTML = '!!';
    playSound(buttonsObj[0].sound);
    playSound(buttonsObj[1].sound);
    playSound(buttonsObj[2].sound);
    playSound(buttonsObj[3].sound);

    setTimeout(function() {
      softReset();
    }, delay);
  } else {

    display.innerHTML = '!';
    let offset = 0;
    turn = false;
    playerMoves = [];

    setTimeout(function() {
      computerMoves.forEach(function(e) {
        setTimeout(function() {
          buttonFunc(buttonsObj[e].button, buttonsObj[e].sound, buttonsObj[e].active);
        }, delay + offset);
        offset += delay;
      });
    }, delay);

    setTimeout(function() {
      display.innerHTML = counter;
      turn = true;
      gameStart = true;
    }, delay);
  }
}

function arraysEqual(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      fail();
    }
  }
}

startBtn.addEventListener('click', () => {
  if (gameOn === true && gameStart === false) {
    gameStart = true;
    console.log('gameStart:', gameStart);
    computerRandom();
  }
});

strictBtn.addEventListener('click', () => {
  if (gameOn === true && strict === false) {
    strict = true;
    strictLED.classList.add('strict-led-on');
    console.log('Strict mode:', strict);
  } else {
    strict = false;
    strictLED.classList.remove('strict-led-on');
    console.log('Strict mode:', strict);
  }
});

// IIFE for off/on power switch
(function togglePower() {
  const powerBtn = document.querySelector('#power');
  const counterLED = document.querySelector('#counter');
  function powerSwitch() {
    powerBtn.classList.toggle('switch-btn-on');
    counterLED.classList.toggle('led-on');
    if (powerBtn.classList.contains('switch-btn-on')) {
      gameOn = true;
    } else {
      resetGame();
    }
  }
  if (is_touch_device() === 1) {
    powerBtn.addEventListener('touchstart', powerSwitch);
    console.log('mobile device detected');
  } else {
    powerBtn.addEventListener('click', powerSwitch);
  }

}());

let winnerMsgArr = ['WI', 'IN', 'NN', 'NE', 'ER', 'R!', '!!', '!#', '#$', '$@', '!&', '!!'];

function winnerMsg() {

  let offset = 0;

  setTimeout(function() {
    winnerMsgArr.forEach(function(e) {
      setTimeout(function() {
        display.innerHTML = e;
      }, 500 + offset);
      offset += 500;
    });
  }, 500);
}

function softReset() {

  gameStart = false;
  turn = false;
  counter = 0;
  playerCounter = 0;
  display.innerHTML = '--';
  playerMoves = [];
  computerMoves = [];
  console.clear();

}

function resetGame() {
  gameOn = false;
  gameStart = false;
  turn = false;
  counter = 0;
  playerCounter = 0;
  display.innerHTML = '--';
  strictLED.classList.remove('strict-led-on');
  strict = false;
  playerMoves = [];
  computerMoves = [];
  console.clear();
}
