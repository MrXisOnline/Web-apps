import { createRoot } from "react-dom/client";
import { useState } from "react";
import TestComp1 from "./components/TestComp1";
import App from "./App.jsx";
import CondComp from "./components/CondComp.jsx";
import "./index.css";
import JokeComp from "./components/JokeComp.jsx";
import tree from "./assets/images/tree-image.jpg";
import TestComp2 from "./components/TestComp2.jsx";
import TestComp3 from "./components/TestComp3.jsx";
import Pads from "./components/Pads.jsx";

// function App() {
//     function handleClick() {
//         console.log("Button clicked!");
//     }
//     function handleMouseOver() {
//         console.log("Mouse over");
//     }
//   return (
//     <>
//       <img src={tree} alt="" onMouseOver={handleMouseOver} width="400px"/>
//       <button onClick={handleClick}>button</button>
//     </>
//   );
// }

// function App() {
//     const [state, setState] = useState(0);
//     function handleClickAdd() {
//         setState(state => state + 1);
//     }
//     function handleClickSub() {
//         setState(state => state - 1);
//     }
//     return (
//         <>
//             <main>
//                 <h1>How many times will Bob say "state" in this section?</h1>
//                 <p>Bob says {state}</p>
//                 <button onClick={handleClickAdd}>+</button>
//                 <button onClick={handleClickSub}>-</button>
//             </main>
//         </>
//     );
// }

const root = createRoot(document.getElementById("root"));
// console.log(import.meta.env.VITE_HF_ACCESS_TOKEN);
root.render(
    <App />
    
    // <TestComp2 />
    // <JokeComp />
    // <CondComp />
    // <TestComp3 />
    // <Pads />
);