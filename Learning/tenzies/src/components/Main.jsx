import React from "react"

export default function Main() {
    const [dies, setDies] = React.useState(Array.from({ length: 10 }, () => (
                                            {
                                                value: Math.floor(Math.random()*10), 
                                                isClicked: false
                                            }
                                        )));
    const [gameState, setGameState] = React.useState(false);
    function handleDiesClick(index) {
        // setDies((prev) => {
        //     prev[i].isClicked = true;
        //     console.log(prev)
        //     return prev
        // })
        // console.log(dies)
        setDies(prevDies => 
            prevDies.map((die, i) => 
                i === index ? { ...die, isClicked: !die.isClicked } : die
            )
        );
        let number = dies[0].value;
        let check = 0;
        dies.forEach(i => {
            if (i.value !== number){
                check++;
            }
        })
        if (check === 0) {
            setGameState(true);
        }
    }

    function handleRollClick() {
        // setDies((prev) => {
        //     prev.map((i) => {
        //         if (i.isClicked === false) {
        //             i.value = Math.floor(Math.random()*10)
        //         }
        //     })
        //     return prev
        // })
        setDies(prevDies => 
            prevDies.map(die => 
                die.isClicked ? die : { ...die, value: Math.floor(Math.random() * 10) }
            )
        );
    }
    function handleStartClick() {
        setDies(Array.from({ length: 10 }, () => (
            {
                value: Math.floor(Math.random()*10), 
                isClicked: false
            }
        )))
        setGameState(false)
    }
    console.log('Rendered')

    return (
        <main>
            <div className="all-dies">
                {dies.map((die, index) => {
                    return (
                        <button 
                            className={`dies-Btn ${die.isClicked ? "green": ""}`} 
                            key={index} 
                            onClick={() => handleDiesClick(index)} 
                        >{die.value}</button>
                    )
                })}
            </div>
            {gameState === false && <button className="roll-Btn" 
                onClick={handleRollClick}
            >Roll</button>}
            {gameState && <button className="roll-Btn roll-start-Btn" 
                onClick={handleStartClick}
            >Reset Game</button>}
        </main>
    )
}