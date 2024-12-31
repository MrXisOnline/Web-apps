import { Component } from "react";
import Entry from "./Entry";
import Marker from "../assets/images/marker.png";
import PlacesData from "../assets/data.js";

class Main extends Component {
  render() {
    return (
      <>
        {/* <Entry 
          locImg={"https://media.istockphoto.com/id/502617555/photo/world-heritage-mount-fuji-and-lake-shoji.jpg?s=612x612&w=0&k=20&c=1aA-Z53dHEqc59HBiIwKJnQUKBX69BKa5dCU3E3Ck8w="} 
          locName={"Japan"} 
          locLink={"https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu"} 
          locHeading={"Mount Fuji"} 
          locDate={"12 Jan, 2021 - 24 Jan, 2021"} 
          locPara={"Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists."}/> */}
        {PlacesData.map(place => <Entry 
                                    key={place.id}
                                    locImg={place.img.src} 
                                    locName={place.country} 
                                    locLink={place.googleMapsLink} 
                                    locHeading={place.title} 
                                    locDate={place.dates} 
                                    locPara={place.text}
                                    />)}
      </>
    );
  }
}
export default Main;