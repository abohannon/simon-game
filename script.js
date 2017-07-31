  const gameButtons = document.querySelectorAll('.push');

  const soundTL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const soundTR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const soundBL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  const soundBR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  let gameOn = false;
  let gameStart = false;
  let strict = false;

  Array.from(gameButtons).forEach(function(buttons) {
    buttons.addEventListener('click', buttonFunc);
  });

  function buttonFunc(e) {

    if (gameOn) {

      console.log(e.target);
      let buttonID = e.target.dataset.idx;

      if (e.target.id === 'tl') {
        playSound(soundTL);
        console.log(buttonID);
        e.target.classList.add('green-active');
        setTimeout(function(){
          e.target.classList.remove('green-active');
        }, 200);
      }
      if (e.target.id === 'tr') {
        playSound(soundTR);
        console.log(buttonID);
        e.target.classList.add('red-active');
        setTimeout(function(){
          e.target.classList.remove('red-active');
        }, 200);
      }
      if (e.target.id === 'bl') {
        playSound(soundBL);
        console.log(buttonID);
        e.target.classList.add('yellow-active');
        setTimeout(function(){
          e.target.classList.remove('yellow-active');
        }, 200);
      }
      if (e.target.id === 'br') {
        playSound(soundBR);
        console.log(buttonID);
        e.target.classList.add('blue-active');
        setTimeout(function(){
          e.target.classList.remove('blue-active');
        }, 200);
      }
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
        gameReset();
      }
    });
  }());

  function gameReset(){
    console.clear();
  }
