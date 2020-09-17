let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let diceOne = 0;
let diceTwo = 0;

function nextPlayer() {
  document.querySelector('.btn-hold').style.display = 'none';
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  if (roundScore === 1) {
    document.querySelector('.dice').style.display = 'block';
  }
}

function newGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.btn-new').style.display = 'none';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'none';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.diceOne').style.display = 'none';
  document.querySelector('.diceTwo').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
}

newGame();

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-roll').addEventListener('click', () => {
  diceOne = Math.floor(Math.random() * 6) + 1;
  diceTwo = Math.floor(Math.random() * 6) + 1;
  const diceDomOne = document.querySelector('.diceOne');
  const diceDomTwo = document.querySelector('.diceTwo');
  diceDomOne.style.display = 'block';
  diceDomTwo.style.display = 'block';
  diceDomOne.src = `dice-${diceOne}.png`;
  diceDomTwo.src = `dice-${diceTwo}.png`;

  if (diceOne !== 1 || diceTwo !== 1) {
    roundScore += diceOne + diceTwo;
    document.querySelector('.btn-hold').style.display = 'block';
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    if (roundScore + scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector('.diceOne').style.display = 'block';
      document.querySelector('.diceTwo').style.display = 'block';
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';
      document.querySelector('.btn-new').style.display = 'block';
      document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer] + roundScore;
    }
  }
  if (diceOne === 1 || diceTwo === 1) {
    scores[activePlayer] = 0;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  scores[activePlayer] += roundScore;
  document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer];
  document.querySelector('.diceOne').style.display = 'none';
  document.querySelector('.diceTwo').style.display = 'none';
  if (scores[activePlayer] >= 100) {
    document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector('.btn-new').style.display = 'block';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
  } else {
    nextPlayer();
  }
});
