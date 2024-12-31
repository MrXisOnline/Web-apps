import starFilled from "../assets/images/star-filled.png"
import starEmpty from "../assets/images/star-empty.png"

export default function Star({isFilled, handleClick}) {

    let starIcon = isFilled ? starFilled : starEmpty

    return (
        <button
            onClick={handleClick}
            aria-pressed={isFilled}
            aria-label={isFilled ? "Remove from favorites" : "Add to favorites"}
            className="favorite-button">
            <img
                src={starIcon}
                alt={isFilled ? "filled star icon" : "empty star icon"}
                className="favorite"
            />
        </button>
    )
}