const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector("a.btn__reset");
const scoreboard = document.getElementById('scoreboard');
const heart = document.getElementsByClassName("tries");
const liLetter = document.getElementsByClassName('letter');
const liSpace = document.getElementsByClassName('space');
const liShow = document.getElementsByClassName('show');
const chosen = document.getElementsByClassName('chosen');
const title = document.querySelector('.title');
var wrong = 0;
var phrases = [
  'Calm before the storm',
  'Every cloud has a silver lining',
  'My cup of tea',
  'On cloud nine',
  'Roll with the Punches'
];
const ul = document.querySelector('#phrase ul');

// generate random phrase & split into letters - option #2
  const getRandomPhraseAsArray = (arr) => {
    let phraseIndex = Math.floor(Math.random() * phrases.length);
    let randomPhrase = arr[phraseIndex].toLowerCase();
    let phraseLetters = randomPhrase.split("");
    // let phraseLetters = Array.from(randomPhrase);
    return phraseLetters;
  }

  // append phrase letters to document window
  const addPhraseToDisplay = (arr) => {
    let phraseLetters = getRandomPhraseAsArray(phrases);
    phraseLetters.forEach(function(tile) {
      const li = document.createElement('li');
      li.textContent = tile;
      if (tile.includes(' ')) {
          li.className += 'space';
          } else {
            li.className += 'letter';
          }
      ul.appendChild(li);
    });
}

// remove phrase letters from DOM
const removeLetters = () => {
  for (let i =Array.from(liLetter).length-1; i>=0; i--) {
        ul.removeChild(liLetter[i]);
  }
}

// Remove elements with class 'space' from DOM
const removeSpaces = () => {
  for (let i =Array.from(liSpace).length-1; i>=0; i--) {
        ul.removeChild(liSpace[i]);
  }
}

// Replace heart tries
const heartTransplant = () => {
  let heartBlk = Array.from(heart);
    heartBlk.forEach(function(hrt) {
      hrt.style.display ="inline-block"
  });
  wrong = 0;
}

// Remove previous phrase
const reset = () => {
    removeSpaces();
    removeLetters();
}

//compare keyboard letter clicks to hidden phrase letters & reveal matches
const checkLetter = (btn) => {
  let clicks = false;
  const lett = document.getElementsByClassName("letter");
  let newLetter = Array.from(lett);
    for (var i=0; i<newLetter.length; i++) {
      if (btn.textContent === newLetter[i].textContent) {
        clicks=true;
        newLetter[i].classList.add('show');
        // let newLett = newLetter.map(letter => letter.classList.add('show'));
    }
  }
return clicks;
}


// implement checkletter function with click event listener
// add chosen class to buttons
qwerty.addEventListener('click', (event) => {
    let btnLtr = event.target;
      if (event.target.tagName == 'BUTTON') {
        btnLtr.classList.add('chosen');
        btnLtr.setAttribute('disabled', 'true');
      }
    let letterFound = checkLetter(btnLtr);
      if (!letterFound) {
        let btnLtr = event.target;
          if (event.target.tagName == 'BUTTON') {
            wrong++;
            heart[wrong-1].style.display="none";
        }
    }
    checkWin();
    checkWrong();
});

// Check if phrase is solved & game is won
const checkWin = () => {
  if (liLetter.length === liShow.length) {
      overlay.style.display="block";
      overlay.className="win";
      title.innerHTML="Congratulations!";
      console.log('You\'ve Won');
    }
    return true;
  }

// Check if game is lost
const checkWrong = () => {
  if (wrong===5) {
      overlay.style.display="block";
      overlay.className ='lose';
      title.innerHTML="Better Luck Next Time!";
      console.log('GAME OVER');
    }
    return true;
  }

// reset keyboard
  const startOver = () => {
    let resetChosen = Array.from(chosen).map(letter => letter.classList.remove('chosen'));
    let button = document.getElementsByTagName('button');
    Array.from(button).forEach(button => button.removeAttribute('disabled'));
      heartTransplant();
  }

// remove the overlay
btnReset.addEventListener('click', () => {
  overlay.style.display="none";
  reset();
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  startOver();
});



// //generate random phrase and split into letters - option #1
// const getRandomPhraseAsArray = () => {
//   let randomPhrase = phrases[Math.floor(Math.random() * 5)];
//       return randomPhrase.split("");
// }
