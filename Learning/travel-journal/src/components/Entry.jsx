import Marker from "../assets/images/marker.png";

export default function Entry({locImg, locName, locLink, locHeading, locDate, locPara}) {
  return (
    <main>
        <img className="location-image" src={locImg} alt="" />
        <div>
            <div className="location-div">
                <img src={Marker} alt="" className="marker"/>
                <span className="location-name">{locName}</span>
                <a className="location-link" href={locLink}>View on Google Maps</a>
            </div>
            <h1 className="location-heading">{locHeading}</h1>
            <h3 className="location-date">{locDate}</h3>
            <p className="location-para">{locPara}</p>
        </div>
    </main>
  );
}