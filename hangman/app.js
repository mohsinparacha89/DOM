const words = ['banana','guardian','pencil', 'characteristics','smart','denmark','noob',
'Cabbage', 'Turnip', 'Radish', 'Carrot','apple', 'peach'];

const randomWord = words[Math.floor(Math.random()*words.length)];
let wordmap = new Map();

const guessword = document.querySelector('.word');
const submitBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
let wrongGuesses = 5;
const recordedGuesses = [];
let characterToGuess = 0;
submitBtn.addEventListener('click', play);

//play
function play(){
    message.textContent = '';
    const char = guessInput.value;
    if( 0 === char.length || " " === char){
        setMessage('yeah, very smart -_-', 'red');
        guessInput.value = '';
        return;
    }

    if(recordedGuesses.includes(char)){
        setMessage(`'${char}' has been tried already`, 'red');
        guessInput.value = '';
        return;  
    }
   
    const wordKeys = [];
    recordedGuesses.push(char);

    

    wordmap.forEach(function(value, key){
        if(value === char){
            wordKeys.push(key);
        }
    })



    if(wordKeys.length ===0){
            wrongGuesses -= 1;
            setMessage(`${char} is wrong, You have ${wrongGuesses} tries left`, 'red');
            guessInput.value = '';
            if(wrongGuesses === 0){
                gameOver('You Lost', 'red')   
            }
            return;  
    }

    wordKeys.forEach(function(key){
        document.querySelector(`.span-${key}`).textContent = char;
        characterToGuess -= 1;
        if(characterToGuess === 0 ){
            gameOver('You Won!!', 'green') 
        }

    });

    guessInput.value = '';
   
}


Array.from(randomWord).forEach(function(letter,i){
    const character = document.createElement('span');
    character.className = `span-${i}`;
    character.textContent = '_ ';
    wordmap.set(i,letter);
    guessword.appendChild(character);
    characterToGuess +=1;
});

//set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;

}


function gameOver(msg, color){

    submitBtn.disabled = true;
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    submitBtn.style.color = color;
    setMessage(msg, color);
}