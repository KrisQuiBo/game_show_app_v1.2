const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector("a.btn__reset");
const scoreboard = document.getElementById('scoreboard');
let ol = document.querySelector('ol');
let heart = document.getElementsByClassName("tries");
// let heart = ol.firstElementChild;
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
      // for (var i = 0; i < phraseLetters.length; i++) {
      // var text = document.createTextNode(phraseLetters[i]);
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
let buttonClick = qwerty.addEventListener('click', (event) => {
    let btnLtr = event.target;
      if (event.target.tagName == 'BUTTON') {
        btnLtr.classList.add('chosen');
        btnLtr.setAttribute('disabled', 'true');
      }
    let letterFound = checkLetter(btnLtr);
      if (!letterFound) {
        wrong++;
        heart[wrong-1].style.display="none";
        // for (let i=wrong; i<heart.length; i++) {
        // heart[i].style.display="none";
        // }
        console.log('You clicked ' + wrong + ' wrong keys!');
        if (wrong===5) {
          console.log('GAME OVER');
        }
    }
});

//remove the overlay
btnReset.addEventListener('click', () => {
  overlay.style.display="none";
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});




// //generate random phrase and split into letters - option #1
// const getRandomPhraseAsArray = () => {
//   let randomPhrase = phrases[Math.floor(Math.random() * 5)];
//       return randomPhrase.split("");
// }
