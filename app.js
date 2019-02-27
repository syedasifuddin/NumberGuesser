// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI ELements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play Again
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  if(Number.isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  else{

    // Check if won
    if(guess === winningNum){
     gameOver(true, `${winningNum} is correct!, YOU WIN!`)
    }
    else {
      // Wrong Number
      guessesLeft -= 1;
      if(guessesLeft === 0) {
        gameOver(false, `Game Over, You Lost. The correct number was ${winningNum}`)
      }
  
      else{
  
        // game continues
        guessInput.style.borderColor = 'red';
        guessInput.value = '';
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
  }
});


// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg
}

// Game over
function gameOver(won, msg){
  let color;
  won === true? color = 'green' : color = 'red';
  guessInput.disabled = true;

  guessInput.style.borderColor = color;

  message.style.color = color;

  setMessage(msg);
  
  // Play Again 
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

// getWinningNum
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1) + min);
}