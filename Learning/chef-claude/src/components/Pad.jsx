import { useState } from "react";

export default function Pad({id, color, on, toggleFunc}) {
    return (
        <button style={{
            backgroundColor: color,
            width: "100px",
            height: "100px",
            borderRadius: "10px",
            border: "none",
            boxShadow: "0px 0px 10px black",
            opacity: on ? 1 : 0.5
        }} onClick={() => toggleFunc(id)}></button>
    )
}