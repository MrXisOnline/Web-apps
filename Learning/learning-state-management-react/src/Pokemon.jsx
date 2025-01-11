import { PokemonContext, PokemonProvider } from "./Store";
import React from "react";

function ShowPokemon(){
    const pokemon = React.useContext(PokemonContext);
    return (
        <div>
            {pokemon.map((v) => {
                return (
                    <div key={v.id}>
                        <img src={v.image} alt="" />
                        <p>{v.name}</p>
                    </div>
                )
            })}
        </div>
    )

}

export default function App(){
    return (
        <PokemonProvider>
            <ShowPokemon />
        </PokemonProvider>
    )
}