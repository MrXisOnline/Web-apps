import { useState, useReducer, useContext, useCallback, useEffect, createContext } from 'react'
import './App.css'


// interface Pokemon {
//   name: String, 
//   url: String
// }

function Pokemon({pokemon}) {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <p>Theme: {theme}</p>
      {pokemon.map((v) => <p key={v.name}>{v.name}</p>)}
    </div>
  )
}

const ThemeContext = createContext('light');

function App() {
  // const [state, dispatch] = useReducer((state, action) => {
  //   switch(action.type) {
  //     case "SET_NAME":
  //       return {...state, name: action.payload}
  //     case "ADD_NAME":
  //       return {...state, names: [...state.names, state.name]}
  //     default:
  //       throw "error"
  //   }
  // }, {
  //   names: [], 
  //   name: ""
  // })
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const data = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then(res => res.json())
      .then(data => setPokemon(data.results))
    }
    data();
  }, [])

  return (
    <div className='App'>
      {/* <input 
        type="text" 
        value={state.name}
        onChange={e => dispatch({type: "SET_NAME", payload: e.target.value})}
        />
      <div>
        Name = {state.name}<br/>
        <button onClick={e => dispatch({type: "ADD_NAME"})}>ADD NAME</button>
      </div>
      <div>
        List of Name:
        {state.names.map((v) => <p>{v}</p>)}
      </div> */}
      <ThemeContext.Provider value='dark'>
        <Pokemon pokemon={pokemon} />
      </ThemeContext.Provider>

    </div>
  )
}

export default App
