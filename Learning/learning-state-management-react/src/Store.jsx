
// import React, { useEffect } from "react";
// import pokemonjs from "./assets/pokemon.js"

// export const Users = React.createContext([])
// export const PokemonContext = React.createContext([]);

// export const UserProvider = ({children}) => {
//     const [users, setUsers] = React.useState([]);
//     return (
//         <Users.Provider value={{users, setUsers}}>
//             {children}
//         </Users.Provider>
//     )
// }

// export const PokemonProvider = ({children}) => {
//     const [pokemon, setPokemon] = React.useState([]);
//     useEffect(() => {
//         const getPoke = async () => {
//             await fetch(`/src/assets/pokemon.json`)
//             .then(res => res.json())
//             .then(data => setPokemon(data.pokemons))
//         }
//         getPoke();
//         // setPokemon(pokemonjs.pokemons)
//     }, [])

//     return (
//         <PokemonContext.Provider value={pokemon}>
//             {children}
//         </PokemonContext.Provider>
//     )
// }