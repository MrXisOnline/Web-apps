import { Component } from "react";
import Globe from "../assets/images/globe.png";

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="header-nav">
            <img className="globe-img" src={Globe} alt="globe" />
            <span className="nav-text">my travel journal</span>
        </nav>
      </header>
      );
  }
}
export default Header;