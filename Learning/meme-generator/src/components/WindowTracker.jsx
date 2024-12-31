import React from "react"

export default function WindowTracker() {

    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        function watchWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", watchWidth);
        return function() {
            window.removeEventListener("resize", watchWidth);
        }
    }, [])
    return (
        <h1>Window width: {width}</h1>
    )
}