import '../assets/scss/components/ScoreBoard.scss';

function ScoreBoard({score}) {
    return (
        <div className="score-board">
            <span>Punteggio: {score}</span>
        </div>
    );
}

export default ScoreBoard