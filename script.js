//TODO: create function to compare computerMoves and playerMoves
//TODO: create function to increment computerMoves every time


  const gameButtons = document.querySelectorAll('.push');

  // const greenBtn = document.querySelector('#green');
  // const redBtn = document.querySelector('#red');
  // const yellowBtn = document.querySelector('#yellow');
  // const blueBtn = document.querySelector('#blue');

  const startBtn = document.querySelector('#start');
  const strictBtn = document.querySelector('#strict');
  const strictLED = document.querySelector('.strict-led');
  const display = document.querySelector('#counter');

  // const soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  // const soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  // const soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  // const soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  const buttonsObj = [
    {
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
  let computerMoves = [];
  let playerMoves = [];
  let delay = 1000;

  Array.from(gameButtons).forEach(buttons => {
    buttons.addEventListener('click', outerButtons);
  });

  // General button behavior (sounds, active state, delay)
  function buttonFunc(eventVar, soundVar, activeClass){
    playSound(soundVar);
    eventVar.classList.add(activeClass);
    setTimeout(function(){
      eventVar.classList.remove(activeClass);
    }, 250);
  }

  function outerButtons(e) {

    if (gameOn) {

      let buttonID = e.target.dataset.idx;

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
      playerMoves.push(buttonID);
      console.log('player moves:', playerMoves);
    }
  }

  function playSound(e) {
    e.play();
  }

  function updateCount() {
    counter++;
    display.innerHTML = counter;
  }

  function computerRandom(){

    // generate a random number to be used to select a random button index
    let rand = Math.floor(Math.random()*4);

    // select a random button every time computerMove() loads; delay the move so it doesn't happen instantly
    setTimeout(function(){
        buttonFunc(buttonsObj[rand].button, buttonsObj[rand].sound, buttonsObj[rand].active);
        computerMoves.push(buttonsObj[rand].idx);
        console.log('computer moves:', computerMoves);
        updateCount();
        console.log('counter:', counter);
    }, delay);
  }

  function computerMove(){

    let offset = 0;

    computerMoves.forEach(function(e){
      setTimeout(function(){
          buttonFunc(buttonsObj[e].button, buttonsObj[e].sound, buttonsObj[e].active);
      },delay + offset);
      offset += delay;
    });

    setTimeout(function(){
      computerRandom();
    }, offset);

  }

  startBtn.addEventListener('click', () => {
    if (gameOn === true && gameStart === false) {
      gameStart = true;
      console.log('Start game:', gameStart);
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
    powerBtn.addEventListener('click', function() {
      powerBtn.classList.toggle('switch-btn-on');
      counterLED.classList.toggle('led-on');
      if (powerBtn.classList.contains('switch-btn-on')) {
        gameOn = true;
      } else {
        resetGame();
      }
    });
  }());

  function resetGame() {
    gameOn = false;
    gameStart = false;
    counter = 0;
    display.innerHTML = '--';
    strictLED.classList.remove('strict-led-on');
    strict = false;
    playerMoves = [];
    computerMoves = [];
    console.clear();
  }
