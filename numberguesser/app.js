/*
THE RULES
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer in lost scenario
- Let player choose to play again
*/

//Game values 
let min = 1, max =10, winningNum = getRandomNumber(min,max), guessesLeft = 3;

//UI Element
const game = document.querySelector('#game'), 
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again' ){
        window.location.reload();
    }
});
//Liten for guesses
guessBtn.addEventListener('click', function(){
   let guess =  parseInt(guessInput.value)
   //validate
   if(isNaN(guess)|| guess < min || guess > max){
       setMessage(`Please enter a number between ${min} and ${max}`, 'red');
       return ;
   }


   //Check if won
   if(guess === winningNum){
    gameOver(true,`${guess} is correct, you win!`);
   }

   else {
    guessesLeft -= 1;
    
    if(guessesLeft === 0){   
        gameOver(false,`Game Over mate, the correct number was ${winningNum}`);
    }
    else {
        //Continue
        guessInput.style.borderColor = 'red';
        guessInput.value = '';
        setMessage(`${guess} is not correct, guesses left :${guessesLeft} try again`, 'red')
    }
   }
;});

//set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;

}

//Game over
function gameOver(won,msg){
    guessInput.disabled = true;

    borderColor = won ? 'green' : 'red';
    guessInput.style.borderColor = borderColor;
    setMessage(msg,borderColor)

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//get winning number
function getRandomNumber(min, max){
   return Math.floor(Math.random() * (max - min + min));
}