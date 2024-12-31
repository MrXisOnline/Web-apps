import React, {Component} from "react";
import ReactIMG from "../assets/react-logo.png"

class Header extends Component{
    render() {
        return (
            <header>
                <nav className="nav">
                    <div className="branding-container">
                        <img src={ReactIMG} alt="react logo" />
                        <span className="brand-name">ReactApps</span>
                    </div>
                    <ul className="nav-items">
                        <li>Pricing</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
        )
    }
}
export default Header;