  const gameButtons = document.querySelectorAll('.push');

  const greenBtn = document.querySelector('#green');
  const redBtn = document.querySelector('#red');
  const yellowBtn = document.querySelector('#yellow');
  const blueBtn = document.querySelector('#blue');

  const startBtn = document.querySelector('#start');
  const strictBtn = document.querySelector('#strict');
  const strictLED = document.querySelector('.strict-led');
  const display = document.querySelector('#counter');

  const soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  const soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  let gameOn = false;
  let gameStart = false;
  let strict = false;
  let counter = 0;

  Array.from(gameButtons).forEach(buttons => {
    buttons.addEventListener('click', outerButtons);
  });

  // General button behavior (sounds, active state, delay)
  function buttonFunc(eventVar, soundVar, activeClass){
    playSound(soundVar);
    eventVar.target.classList.add(activeClass);
    setTimeout(function(){
      eventVar.target.classList.remove(activeClass);
    }, 250);
  }

  function outerButtons(e) {

    if (gameOn) {

      let buttonID = e.target.dataset.idx;

      if (e.target.id === 'green') {
        buttonFunc(e, soundGreen, 'green-active');
      }
      if (e.target.id === 'red') {
        buttonFunc(e, soundRed, 'red-active');
      }
      if (e.target.id === 'yellow') {
        buttonFunc(e, soundYellow, 'yellow-active');
      }
      if (e.target.id === 'blue') {
        buttonFunc(e, soundBlue, 'blue-active');
      }
      updateCount();
      console.log(counter);
    }
  }

  function playSound(e) {
    e.play();
  }

  function updateCount() {
    counter++;
    display.innerHTML = counter;
  }

  startBtn.addEventListener('click', () => {
    if (gameOn === true && gameStart === false) {
      gameStart = true;
      console.log('Start game:', gameStart);
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
    console.clear();
  }
