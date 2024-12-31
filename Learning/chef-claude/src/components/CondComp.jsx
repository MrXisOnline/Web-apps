import React from "react"

export default function CondComp() {
    const [unreadMessages, setUnreadMessages] = React.useState(["a", "b"])
    
    /**
     * Challenge:
     * Only display the <h1> below if there are unread messages
     */
    
    return (
        <div>
            {
                unreadMessages.length > 0 && 
                <h1>You have {unreadMessages.length} unread {unreadMessages.length === 1 ? "message" : "messages"}!</h1>
            }
            {unreadMessages.length === 0  && <p>You're all caught up!</p>}
        </div>
    )
}