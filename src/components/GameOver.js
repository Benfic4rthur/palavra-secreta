import './GameOver.css';
const GameOver = ({ restartGame, pontos }) => {
    return (
        <div>
            <h1>FIM DE JOGO!</h1>
            <h2>Sua pontuação foi: <span>{pontos}</span></h2>
            <button onClick={restartGame} className='end-btn'>Tentar novamente!</button>
        </div>
    );
};

export default GameOver;
