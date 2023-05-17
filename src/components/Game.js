import './Game.css';
import { useState, useRef } from 'react';
const Game = ({
    verificaLetra,
    pegaPalavra,
    pegaCategoria,
    letras,
    letrasAdivinhadas,
    letrasErradas,
    chances,
    pontos,
}) => {
    const [letra, setLetra] = useState('');
    const referenciaDaLetraImputada = useRef(null);
    const virgula = ',';
    const enviaLetra = (e) => {
        e.preventDefault();
        verificaLetra(letra);
        setLetra('');
        referenciaDaLetraImputada.current.focus();
    };
    return (
        <div className='game'>
            <h1>Adivinhe a palavra:</h1>
    <h3 className='tipo'>Dica sobre a palavra: <span>{pegaCategoria}</span>
        <p>
        Você ainda tem{" "}<span className={chances < 5 && chances >= 3 ? "shake" : (chances < 3 ? "danger" : "chances")}>{chances}</span>{" "}tentativa(s).
        </p>
    </h3>

            <div className='ContainerPalavras'>
                {letras.map((letra, i) => ( // pega as letras
                    letrasAdivinhadas.includes(letra) ? ( // verifica se a letra ja foi adivinhada
                        <span key={i} className='letra'>{letra}</span> // se sim, retorna a letra
                    ) : 
                    (
                        <span className="quadradoBranco"></span> // se nao, retorna espaço
                    )
                ))}
            </div>

            <div className='ContainerLetra'>
                <p>Tente advinhar uma letra da palavras:</p>
                <form onSubmit={enviaLetra}>
                    <input type='text' name='letra' maxLength={1} required onChange={e => setLetra(e.target.value)} value={letra} ref={referenciaDaLetraImputada}/>
                    <button>Jogar</button>
                </form>
            </div>
            <div className='ContainerLetrasErradas'>
                <p>Letras Já utilizadas:</p>
                {letrasErradas.map((letra, i) => (
                    <span key={i} className='letraErrada'> {letra} {virgula} </span>
                ))}
            </div>
            <p className='pontos'>
                <span>Pontuação: {pontos}</span>
            </p>
        </div>
    );
};

export default Game;
