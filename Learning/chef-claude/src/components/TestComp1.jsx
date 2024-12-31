import { useState } from "react"
export default function TestComp1() {
    /**
       * Challenge: Convert the code below to use an array
       * held in state instead of a local variable. Initialize 
       * the state array as an empty array
       * 
       * Don't worry about fixing `addFavoriteThing` quite yet.
       */
    const [myFavoriteThings, setStateFunc] = useState([])
    const allFavoriteThings = ["💦🌹", "😺", "💡🫖", "🔥🧤", "🟤🎁", 
    "🐴", "🍎🥧", "🚪🔔", "🛷🔔", "🥩🍝"]
    const thingsElements = myFavoriteThings.map(thing => <p key={thing}>{thing}</p>)
  
    function addFavoriteThing() {
      setStateFunc(prev => [...prev, allFavoriteThings[prev.length]])
    }
    
    return (
      <main>
        <button onClick={addFavoriteThing}>Add item</button>
        <section aria-live="polite">
          {thingsElements}
        </section>
      </main>
    )
  }