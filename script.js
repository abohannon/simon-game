  const gameButtons = document.querySelectorAll('.push');
  const startBtn = document.querySelector('#start');
  const strictBtn = document.querySelector('#strict');
  const display = document.querySelector('#counter');

  const soundTL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const soundTR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const soundBL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  const soundBR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  let gameOn = false;
  let gameStart = false;
  let strict = false;
  let counter = 0;

  Array.from(gameButtons).forEach(buttons => {
    buttons.addEventListener('click', outerButtons);
  });

  function outerButtons(e) {

    if (gameOn) {

      let buttonID = e.target.dataset.idx;

      if (e.target.id === 'tl') {
        playSound(soundTL);
        e.target.classList.add('green-active');
        setTimeout(function() {
          e.target.classList.remove('green-active');
          console.log('target:', buttonID);
        }, 250);
      }
      if (e.target.id === 'tr') {
        playSound(soundTR);

        e.target.classList.add('red-active');
        setTimeout(function() {
          e.target.classList.remove('red-active');
          console.log('target:', buttonID);
        }, 250);
      }
      if (e.target.id === 'bl') {
        playSound(soundBL);
        e.target.classList.add('yellow-active');
        setTimeout(function() {
          e.target.classList.remove('yellow-active');
          console.log('target:', buttonID);
        }, 250);
      }
      if (e.target.id === 'br') {
        playSound(soundBR);
        e.target.classList.add('blue-active');
        setTimeout(function() {
          e.target.classList.remove('blue-active');
          console.log('target:', buttonID);
        }, 250);
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
    const strictLED = document.querySelector('.strict-led');
    if (gameOn === true && strict === false) {
      strict = true;
      strictLED.classList.add('strict-led-on');
    } else {
      strict = false;
      strictLED.classList.remove('strict-led-on');
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
    console.clear();
  }
