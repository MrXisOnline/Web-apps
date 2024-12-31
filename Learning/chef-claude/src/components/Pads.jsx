import { useState } from "react";
import Pad from "./Pad.jsx";
import pads from "../assets/pads.js";

export default function Pads() {
    const [npads, setPadsState] = useState(pads);
    function toggle(id){
        console.log("clicked " + id );
        setPadsState((prev) => {
            prev[id-1].on = !prev[id-1].on;
            return [...prev];
        })
    }
    const padElements = npads.map((pad) => <Pad key={pad.id} id={pad.id} color={pad.color} on={pad.on} toggleFunc={toggle}/>)
    return (
        <main>
            <div className="pad-container" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
            }}>
                {padElements}
            </div>
        </main>
    )
}