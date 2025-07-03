let scores, currentScore, activePlayer, playing;
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    document.querySelector('.play1btn').textContent = '0';
    document.querySelector('.play2btn').textContent = '0';
    document.querySelector('.play1scr').textContent = '0';
    document.querySelector('.play2scr').textContent = '0';
    document.querySelector('.play1').style.color = 'black';
    document.querySelector('.play2').style.color = 'black';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.container1').style.backgroundColor = 'rgb(246, 199, 221)';
    document.querySelector('.container2').style.backgroundColor = 'rgb(192, 115, 147)';
    document.querySelector('.container1').classList.add('activeplayer');
    document.querySelector('.container2').classList.remove('activeplayer');
}
function switchPlayer() {
    currentScore = 0;
    document.querySelector(`.play${activePlayer + 1}scr`).textContent = currentScore;
    document.querySelector(`.container${activePlayer + 1}`).classList.remove('activeplayer');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.container${activePlayer + 1}`).classList.add('activeplayer');
}
document.querySelector('.roll').addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        const diceEl = document.querySelector('.dice');
        diceEl.style.display = 'block';
        diceEl.src = `./dice-${dice}.jpg`;
        diceEl.classList.remove('rolling');
        void diceEl.offsetWidth;
        diceEl.classList.add('rolling');
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`.play${activePlayer + 1}scr`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});
document.querySelector('.hold').addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`.play${activePlayer + 1}btn`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            const winnerBox = document.querySelector(`.container${activePlayer + 1}`);
            winnerBox.style.backgroundColor = 'green';
            document.querySelector('.container1').classList.remove('activeplayer');
            document.querySelector('.container2').classList.remove('activeplayer');
            document.querySelector(`.play${activePlayer + 1}`).style.color = 'white';
            alert(`Player ${activePlayer + 1} wins! 🎉`);
            document.querySelector('.dice').style.display = 'none';
        } else {
            switchPlayer();
        }
    }
});
document.querySelector('.newgame').addEventListener('click', init);
init();
