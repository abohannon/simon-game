  const gameButtons = document.querySelectorAll('.push');

  const soundTL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const soundTR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const soundBL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  const soundBR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  let gameOn = false;

  Array.from(gameButtons).forEach(function(buttons) {
    buttons.addEventListener('click', buttonFunc);
  });

  function buttonFunc(e) {

    console.log(e.target);

    if (e.target.id === 'tl') {
      playSound(soundTL);
    }
    if (e.target.id === 'tr') {
      playSound(soundTR);
    }
    if (e.target.id === 'bl') {
      playSound(soundBL);
    }
    if (e.target.id === 'br') {
      playSound(soundBR);
    }

  }

  function playSound(e) {
    e.play();
  }

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
        gameOn = false;
      }
    });
  }());
