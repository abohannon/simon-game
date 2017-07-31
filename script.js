  const gameButtons = document.querySelectorAll('.push');

  const soundTL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  const soundTR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  const soundBL = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  const soundBR = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  Array.from(gameButtons).forEach(function(buttons){
    buttons.addEventListener('click', buttonFunc);
  });

  function buttonFunc(e){
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

  function playSound(e){
    e.play();
  }
