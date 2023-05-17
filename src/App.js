// hooks
import { useCallback, useState, useEffect } from 'react';
// css
import './App.css';
// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';
// data
import { wordsList } from './data/words';

const stages = [
    { id: 1, name: 'start' },
    { id: 2, name: 'game' },
    { id: 3, name: 'end' },
];
const quantidadeChances = 5;
const quantidadePontos = 0;

function App() {
    const [gameStage, setGameStage] = useState(stages[0].name); // inicia como 'start'
    const [words] = useState(wordsList); // pega as palavras da lista
    const [pegaPalavra, setPegaPalavra] = useState(''); // pega palavra
    const [pegaCategoria, setPegaCategoria] = useState(''); // pega categoria
    const [letras, setLetras] = useState([]); // pega as letras
    const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]); // pega as letras adivinhadas
    const [letrasErradas, setLetrasErradas] = useState([]); // pega as letras erradas
    const [chances, setChances] = useState(quantidadeChances); // pega as chances
    const [pontos, setPontos] = useState(quantidadePontos); // pega pontos

    // pega palavra e categoria
    const pegaPalavraECategoria = useCallback(() => {
        // categoria
        const categorias = Object.keys(words); // pega as categorias pelo objeto words
        const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]; // pega uma categoria aleatoria
        // palavra
        const palavras = words[categoria]; // pega as palavras da categoria
        const palavra = palavras[Math.floor(Math.random() * palavras.length)]; // pega uma palavra aleatoria
        return { palavra, categoria };
    }, [words]);
    // start game
    const startGame = useCallback(() => {
        //limpa todos os status ao iniciar
        limpaStatus();
        // pega palavra e categoria
        const { palavra, categoria } = pegaPalavraECategoria(); // pega palavra e categoria
        // desmancha palavra
        let desmanchaPalavra = palavra.split(''); // desmancha palavra
        desmanchaPalavra = desmanchaPalavra.map(l => l.toLowerCase()); // transforma em minusculo a primeira letra
        // remove acentos
        desmanchaPalavra = desmanchaPalavra.map(l =>
            l.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        );
        console.log(`Palavra: ${palavra} da categoria: ${categoria}`); // imprime palavra e categoria
        // seta status
        setPegaPalavra(palavra); // seta palavra
        setPegaCategoria(categoria); // seta categoria
        setLetras(desmanchaPalavra); // seta letras
        setGameStage(stages[1].name); // seta status
    }, [pegaPalavraECategoria]);

    // processamento
    const verificaLetra = letra => {
        const normalizaLetra = letra.toLowerCase();
        // checando se a letra ja foi adivinhada ou errada
        if (letrasAdivinhadas.includes(normalizaLetra) || letrasErradas.includes(normalizaLetra)) {
            return;
        }
        // inclue letra adivinhada ou remove uma chance
        if (letras.includes(normalizaLetra)) {
            setLetrasAdivinhadas(letrasAdivinhadasAtuais => [
                ...letrasAdivinhadasAtuais,
                normalizaLetra,
            ]);
        } else {
            setLetrasErradas(letrasErradasAtuais => [...letrasErradasAtuais, normalizaLetra]);
            setChances(chancesAtuais => chancesAtuais - 1);
        }
    };
    const limpaStatus = () => {
        // limpa status
        setLetrasAdivinhadas([]);
        setLetrasErradas([]);
    };
    // finalização do game over
    useEffect(() => {
        if (chances === 0) {
            limpaStatus(); // chama função limpaStatus
            // seta status caso perca
            alert('A palavra era: ' + pegaPalavra);
            setGameStage(stages[2].name);
        }
    }, [chances]);

    // finalização da vitoria
    useEffect(() => {
        const letrasUnicas = [...new Set(letras)]; // array de letras unicas
        // condição de vitoria
        if (letrasAdivinhadas.length === letrasUnicas.length && gameStage === stages[1].name) {
            setPontos(pontosAtuais => (pontosAtuais += 100));
            setChances( chancesAtuais => chancesAtuais + 1);
            // reinicia o jogo
            startGame();
        }
    }, [letrasAdivinhadas, letras, startGame]);

    // restart
    const restartGame = () => {
        setPontos(0);
        setChances(quantidadeChances);
        setGameStage(stages[0].name);
    };

    return (
        <div className='App'>
            {gameStage === 'start' && <StartScreen startGame={startGame} />}
            {gameStage === 'game' && (
                <Game
                    verificaLetra={verificaLetra}
                    pegaPalavra={pegaPalavra}
                    pegaCategoria={pegaCategoria}
                    letras={letras}
                    letrasAdivinhadas={letrasAdivinhadas}
                    letrasErradas={letrasErradas}
                    chances={chances}
                    pontos={pontos}
                /> // passa os valores para as props
            )}
            {gameStage === 'end' && <GameOver restartGame={restartGame} pontos={pontos} />}
        </div>
    );
}

export default App;
