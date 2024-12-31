import { createRoot } from 'react-dom/client'
import './index.css'
import Contact from './components/Contact';
import Joke from './components/Joke';
import felix from './assets/images/felix.png';
import whisker from './assets/images/mr-whiskerson.png';
import fluffy from './assets/images/fluffykins.png';
import pumpkin from './assets/images/pumpkin.png';
import App from './App.jsx'
import JokesData from "./assets/jokesData.js"

function NameComp() {
  const firstName = 'John';
  const lastName = 'Doe';
  return (
    <h1>Hi {firstName} {lastName}</h1>
  )
}
function TimeComp(){
  const time = new Date().getHours();
  let timeofDay;
  if (time < 12) {
    timeofDay = 'morning';
  } else if (time >= 12 && time < 17) {
    timeofDay = 'afternoon';
  } else {
    timeofDay = 'night';
  }
  return (
    <h2>It is {timeofDay}</h2>
  )
}

function RenderData(){
  return (
    <div>
      {JokesData.map(joke => <Joke setup={joke.setup} punchline={joke.punchline}/>)}
      
    </div>
  )
}


createRoot(document.getElementById('root')).render(
  <>
    {/* <Contact 
      img={felix} 
      name="Felix" 
      phone="(212) 555-4567" 
      email="thecat@hotmail.com" />
    <Contact 
      img={whisker} 
      name="Mr. Whiskerson" 
      phone="(212) 555-1234" 
      email="mr.whiskaz@catnap.meow" />
    <Contact 
      img={fluffy} 
      name="Fluffykins" 
      phone="(212) 555-2345" 
      email="fluff@me.com" />
    <Contact 
      img={pumpkin} 
      name="Pumpkin" 
      phone="(0800) CAT KING" 
      email="pumpkin@scrimba.com" /> */}
    {/* <Joke 
      setup="Why did the chicken cross the road?" 
      punchline="To get to the other side." 
      upvotes={1} 
      downvotes={4} />
    <Joke 
      setup="Why did the turkey cross the road?" 
      punchline="To prove he wasn't chicken." 
      upvotes={5} 
      downvotes={2} /> */}
    <App />
  </>
  ,
)
