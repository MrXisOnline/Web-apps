import mail from "../assets/images/mail-icon.png";
import phoneIcon from "../assets/images/phone-icon.png";

export default function Contact({img, name, phone, email}) {
  return (
    <>
      <article className="contact-card">
            <img 
                src={img}  
                alt="Photo of {name}"
            />
            <h3>{name}</h3>
            <div className="info-group">
                <img 
                    src={phoneIcon} 
                    alt="phone icon" 
                />
                <p>{phone}</p>
            </div>
            <div className="info-group">
                <img 
                    src={mail} 
                    alt="mail icon"
                />
                <p>{email}</p>
            </div>
        </article>
    </>
  );
}