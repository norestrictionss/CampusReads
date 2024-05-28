import React from 'react';
import "../AdminBooks.css";
import { Link } from 'react-router-dom';
import { removeBookFromBooklist } from '../pages/Operations';

const AdminBookCard = ({ id, userId, title, author, image }) => {
  // Başlık ve yazarın belirli bir karakter sınırını aşması durumunda kısaltma işlemi
  const maxTitleLength = 30;
  const maxAuthorLength = 15;
  const truncatedTitle = title.length > maxTitleLength ? `${title.substring(0, maxTitleLength)}...` : title;
  const truncatedAuthor = author.length > maxAuthorLength ? `${author.substring(0, maxAuthorLength)}...` : author;

  // Başlık ve yazarın uzunluğuna göre dinamik olarak belirlenen metin boyutu
  const titleFontSize = title.length > maxTitleLength ? '1rem' : '1.2rem';
  const authorFontSize = author.length > maxAuthorLength ? '0.8rem' : '1rem';

  return (
    <div className="col" id="adminBookPageCol">
      <div className="card" id="adminBookcard">
      <Link to={`/adminDetails/${userId}/${id}`}>
          <img src={image} alt={title} />
        </Link>
        <div className="card-body" style={{ maxWidth: '100%' }}>
          <h2 style={{ textAlign: 'left', fontSize: titleFontSize, marginBottom: '0.5rem' }}>{truncatedTitle}</h2>
          <p style={{ textAlign: 'left', fontSize: authorFontSize, marginBottom: '0.5rem' }}>Author: {truncatedAuthor}</p>
        </div>
        <div className="card-footer">
        <a onClick = {()=>removeBookFromBooklist(userId, id)} className="btn btn-sm btn-danger mb-2" style={{float:"center"}}>DELETE</a>
        </div>
      </div>
    </div>
  );
};

export default AdminBookCard;
