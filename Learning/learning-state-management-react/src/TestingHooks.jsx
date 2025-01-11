import { useState, useReducer, useContext, useCallback, useEffect, createContext, useRef } from 'react';
// import { Users, UserProvider } from './Store';

function AddUser() {
    const {users, setUsers} = useContext(Users);
    const nameRef = useRef(null);
    function submitName(){
        console.log(nameRef.current.value);
        const nval = nameRef.current.value;
        setUsers((users) => [...users, nval]);
        nameRef.current.value = "";
    }
    console.log('Rendered');
    return (
        <div>
            <input type="text" placeholder='Name' ref={nameRef}/>
            <button onClick={submitName}>Submit</button>
        </div>
    )
}

function ShowUsers() {
    const {users, setUsers} = useContext(Users);
    console.log('Rendered');
    return (
        <div>
            {users.length > 0 ? users.map((u) => <p key={u}>{u}</p>) : <p>No Users</p>}
        </div>
    )
}

// async function getPokemonData(){
//     let pokes = [];
//     for (let i=1; i<=100; i++){
//         await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
//         .then(res => res.json())
//         .then(data => pokes.push({'id': data.id, 'name': data.name, 'image': data.sprites.front_default}))
//     }
//     console.log(pokes)
//     jsObj = JSON.stringify({pokes})
// }

export default function App() {
    return (
        <>
            {/* <UserProvider>
                <AddUser />
                <ShowUsers />
            </UserProvider> */}
            {/* <button onClick={getPokemonData}>get pokies</button> */}
        </>
    )
}