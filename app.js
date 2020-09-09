let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let prevDice = 0;
let dice = 0;

console.log('Hello app!');

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
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
}

newGame();

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-roll').addEventListener('click', () => {
  prevDice = dice;
  dice = Math.floor(Math.random() * 6) + 1;
  const diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = `dice-${dice}.png`;

  if (dice !== 1) {
    roundScore += dice;
    if (dice === prevDice && dice === 6) {
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = 0;
      nextPlayer();
    }
    document.querySelector('.btn-hold').style.display = 'block';
    console.log(prevDice);
    console.log(dice);
    console.log(scores[activePlayer]);
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    if (roundScore + scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';
      document.querySelector('.btn-new').style.display = 'block';
      document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer] + roundScore;
    }
  } else {
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  scores[activePlayer] += roundScore;
  document.querySelector(`#score-${activePlayer}`).innerHTML = scores[activePlayer];
  document.querySelector('.dice').style.display = 'none';
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
