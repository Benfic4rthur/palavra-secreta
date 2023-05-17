import './StartScreen.css';
import logo from './logo.png';

const StartScreen = ({ startGame }) => {
    return (
        <div className='start'>
            <div className="logo">
            <img src={logo} alt="logo" />
            <h1>A Palavra é?</h1>
            </div>
            <button onClick={startGame} className='start-btn'>Começar jogo</button>
        </div>
    );
};

export default StartScreen;
