import React from "react"

export default function Joke(props) {
    /**
     * Challenge:
     * - Create state `isShown` (boolean, default to `false`)
     * - Add a button that toggles the value back and forth
     */
    const [isShown, setShownFunc] = React.useState(false)
    console.log(isShown)
    function toggleIsShown(){
        setShownFunc((prev) => !prev)
    }
    return (
        <div>
            {props.setup && <h3>{props.setup}</h3>}
            {isShown && <p>{props.punchline}</p>}
            <button onClick={toggleIsShown}>{isShown ? "show" : "hide"} punchline</button>
            <hr />
        </div>
    )
}