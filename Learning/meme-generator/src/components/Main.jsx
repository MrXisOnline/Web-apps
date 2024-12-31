import { useState, useEffect } from "react";

export default function Main() {
    /**
     * Challenge: move the hardcoded meme info into React
     * state. Use an object with `topText`, `bottomText`,
     * and `imageUrl` properties, and set the initial values to
     * the ones hardcoded below.
     */
    const [memeInfo, setMemeInfo] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    });
    const [memeData, setMemeData] = useState([]);
    const handleTopChange = (event) => {
        const {value} = event.currentTarget;
        setMemeInfo((prev) => {
            return {
                ...prev,
                topText: value
            }
        })
    }
    const handleBottomChange = (event) => {
        const {value} = event.currentTarget;
        setMemeInfo((prev) => {
            return {
                ...prev,
                bottomText: value
            }
        })
    }
    function chooseMeme(){
        const randomIndex = Math.floor(Math.random() * 100);
        const randomElement = memeData[randomIndex];
        setMemeInfo((prev) => {
            return {
                ...prev, 
                imageUrl: randomElement.url
            }
        })
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setMemeData(data.data.memes))
    }, [])

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText" 
                        onChange={handleTopChange} 
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText" 
                        onChange={handleBottomChange}
                    />
                </label>
                <button onClick={chooseMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imageUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}