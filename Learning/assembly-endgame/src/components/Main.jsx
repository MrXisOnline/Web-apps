import { getRandomWord, getFarewellText } from "../assets/utils.js";
import { languages } from "../assets/languages.js";
import React from "react";

export default function Main(){
    const [word, setWordState] = React.useState([...getRandomWord().toUpperCase()].map((char) => {
        return {
            value: char, 
            reveal: false
        }
    }));
    const msgRef = React.useRef(null);
    const gameRef = React.useRef(null);
    const [langs, setLangState] = React.useState(languages.map((i) => {
        i['exist'] = true;
        return i;
    }))
    const [keys, setKeysState] = React.useState([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((i) => {
        return {
            value: i, 
            clicked: ""
        }
    }))

    function handleKeyboard(key) {
        let count = 0;
        let removed;
        let check=0;
        langs.forEach((lang) => {
            if (!lang.exist) check++;
        })
        if (check === langs.length-1){
            return
        }

        word.forEach((char, index) => {
            if (!char.reveal) {
                if (char.value === keys[key].value) {
                    count++;
                    setWordState(prevState => prevState.map((char, i) => i === index ? {...char, reveal: !char.reveal} : char));
                    setKeysState(prevKeys => prevKeys.map((k, i) => i === key ? {...k, clicked: "green"}: k))
                }
            }
        })
        if (count === 0) {
            for (let index=0; index < langs.length; index++){
                if (langs[index].exist){
                    setLangState(prevLangs => prevLangs.map((val, i) => i === index ? {...val, exist: false}: val));
                    removed = index;
                    break;
                }
            }
            setKeysState(prevKeys => prevKeys.map((k, i) => i === key ? {...k, clicked: "red"}: k))
            msgRef.current.className = "gameMessages wrong";
            msgRef.current.innerHTML = `<h2>${getFarewellText(langs[removed].name)}</h2>`;
        }


        if (removed === langs.length-2){
            msgRef.current.className = "gameMessages lost";
            msgRef.current.innerHTML = "<h4>Game over!</h4><p>You lose! Better start learning Assemply😭</p>";
            gameRef.current.style.display = "block";
        }
    }

    function handleNewGame(){
        window.location.reload(false);
    }

    function checkWin(){
        let check=0;
        for (let i=0; i<word.length; i++){
            if (word[i].reveal) check++;
        }
        console.log(check);
        if (check === word.length){
            console.log(`${check}+${word.length}`)
            msgRef.current.className = "gameMessages win";
            msgRef.current.innerHTML = "<h4>You win!</h4><p>Well done! 💐</p>";
            gameRef.current.style.display = "block";
        }
    }
    checkWin();

    

    return (
        <main>
            <div className="gameMessages" ref={msgRef}>
            </div>
            <div className="game-lives">
                {langs.map((i, index) => <p key={index} style={{
                    backgroundColor: i.backgroundColor, 
                    color: i.color
                }} className={`${i.exist ? "" : "lose"}`}>{i.name}</p>)}
            </div>
            <div className="gameState">
                {[...word].map((ele, index) => <p key={index}>{ele.reveal ? ele.value: ""}</p>)}
            </div>
            <div className="keyboard">
                {keys.map((ele, index) => <button key={index} className={ele.clicked} onClick={() => handleKeyboard(index)}>{ele.value}</button>)}
            </div>
            <div className="start-new-game">
                <button onClick={handleNewGame} ref={gameRef}>
                    New Game
                </button>
            </div>
        </main>
    )
}