import React from "react"

export default function StarData(props) {
    const [starWarsData, setStarWarsData] = React.useState(null)
    const [count, setCount] = React.useState(1);
    
    /**
     * Challenge:
     * Instead of console logging the data, save it in state
     * and display it to the page. (Just replace the hard-coded
     * object inside the `<pre>` element with the data)
     */
    
    React.useEffect(() => {
        fetch(`https://swapi.py4e.com/api/people/${count}`)
            .then(res => res.json()).then(data => setStarWarsData(data))
    }, [count])
    
    
    return (
        <div>
            <button onClick={() => setCount(prev => prev + 1)}>get next character</button>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}