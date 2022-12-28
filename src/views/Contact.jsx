import Footer from "../components/Footer";
import { useState } from "react";
import { useRef } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function Contact() {
  const [value, setValue] = useState();
  const [message, setMessage] = useState([
    {
      name: "",
      surname: "",
      number: "",
      email: "",
      text: "",
    },
  ]);
  //
  const phoneRef = useRef();
  console.log(value);
  const submit = (e) => {
    e.preventDefault();
    setMessage({ ...message, number: value });
    console.log("submit");
    fetch("https://admin.qaraqura.com/create_contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((success) => {
        alert(
          `Təşəkkürlər ${message.name} ${message.surname} mesajınız uğurla göndərildi`
        );
        setMessage({
          name: "",
          surname: "",
          number: "",
          email: "",
          text: "",
        });
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  const handleInput = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  console.log(phoneRef.current);
  phoneRef.current?.addEventListener("change", (e) => {
    setMessage({ ...message, number: e.target.value });
  });
  return (
    <>
      <section className="about-head-text contact">
        <div className="container">
          <span>Əlaqə</span>
          <h2>
            Təklif və ya iradınız var
            <img src="/images/sual-black.png" alt="" />
            Elə isə bizə yazın
            <img src="/images/noqte-black.png" alt="" />
          </h2>
          <form action="">
            <div className="form-group">
              <span>Ad</span>
              <input
                name="name"
                onChange={(e) => handleInput(e)}
                type="text"
                value={message.name}
                placeholder="Adınızı daxil edin"
              />
            </div>
            <div className="form-group">
              <span>Soyad</span>
              <input
                name="surname"
                onChange={(e) => handleInput(e)}
                type="text"
                value={message.surname}
                placeholder="Soyadınızı daxil edin."
              />
            </div>
            <div className="form-group">
              <span>Email</span>
              <input
                onChange={(e) => handleInput(e)}
                name="email"
                type="email"
                value={message.email}
                placeholder="E-poçtunuzu daxil edin."
              />
            </div>
            <div className="form-group">
              <span>Number</span>
              <PhoneInput
                ref={phoneRef}
                placeholder="Enter phone number"
                value={message.number}
                onChange={setValue}
              />
            </div>
            <div className="form-group full">
              <span>Mesajızınızı yazın</span>
              <textarea
                name="text"
                onChange={(e) => handleInput(e)}
                value={message.text}
                placeholder="Maksimum 200 simvol"
              ></textarea>
            </div>
            <button className="btn" type="reset" onClick={(e) => submit(e)}>
              Göndər
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
