import { getRandomWord, getFarewellText } from "../assets/utils.js";
import { languages } from "../assets/languages.js";
import React from "react";

export default function Main(){
    const [word, setWordState] = React.useState(getRandomWord());
    const [langs, setLangState] = React.useState(languages.map((i) => {
        i['exist'] = true;
        return i;
    }))
    const [keys, setKeysState] = React.useState([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((i) => {
        return {
            value: i, 
            clicked: false
        }
    }))

    return (
        <main>
            <div className="gameMessages">

            </div>
            <div className="game-lives">
                {langs.map(i => <p style={{
                    backgroundColor: i.backgroundColor, 
                    color: i.color
                }}>{i.name}</p>)}
            </div>
            <div className="gameState">
                {}
            </div>
            <div className="keyboard">

            </div>
            <button className="start-new-game">
                New game
            </button>
        </main>
    )
}