import React, { useState } from "react";
import "../Details.css"; // Stil dosyanızı içe aktarın

export default function ContactForm() {
  // Ad, soyad, e-posta, telefon ve mesaj için state değişkenleri
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  // Ad değişikliklerini işleyen fonksiyon
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  // Soyad değişikliklerini işleyen fonksiyon
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  // E-posta değişikliklerini işleyen fonksiyon
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Telefon değişikliklerini işleyen fonksiyon
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Mesaj değişikliklerini işleyen fonksiyon
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Form gönderimini işleyen fonksiyon
  const handleSubmit = (event) => {
    event.preventDefault();
    // Form gönderim işlemleri burada gerçekleştirilebilir
    console.log("Ad:", firstName);
    console.log("Soyad:", lastName);
    console.log("E-posta:", email);
    console.log("Telefon Numarası:", phoneNumber);
    console.log("Mesaj:", message);
    // Gönderimden sonra form alanlarını sıfırlayın
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  };

  return (

    <div className="contact-container" style={{ margin: "30px" }}>
      <div className="row">
        <div className="col-md-12 col-lg-7">
          <div className="book-box">
            <div className="row">
              <div className="col-md-12 col-lg-6 column">
                <img className="bookDetailImage" src="/images/harry.png" alt="Book Cover"/>
              </div> 
              <div className="col-md-12 col-lg-6 column">
                <h3 className="bookTitle"><strong>Harry Potter</strong></h3>
                <p className="bookSum"><strong>Summary: </strong>Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek.itabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. K Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek.</p>
                <p className="bookAuthor"><strong>Author:</strong> J.K. ROWLING </p>
                <p className="SSN"><strong>SSN:</strong> 1111111111</p>
                <p className="bookGender"><strong>Gender:</strong> Fantastic</p>
                <p className="bookOwner"><strong>Owner:</strong> İrem Kıranmezar</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

}