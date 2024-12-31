import chef from "../assets/images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chef} alt="chef icon" />
            <h1>Chef Claude</h1>
        </header>
    )
}