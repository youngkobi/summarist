import Sidebar from '@/components/sidebar';
import React from 'react';
import { FaBookOpen, FaMicrophone, FaBookmark } from 'react-icons/fa';

async function getBook(id) {
  const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return {
    id: data.id || id,
    title: data.title || 'Untitled',
    author: data.author || 'Unknown Author',
    description: data.subTitle || 'No description available.',
    image: data.imageLink || 'https://via.placeholder.com/150x220?text=No+Image',
    duration: data.duration || '03:24',
    rating: data.averageRating || '4.4',
    subscriptionRequired: data.subscriptionRequired || false,
    keyIdeas: data.keyIdeas || 0,
    categories: data.categories || [],
  };
}

export default async function BookDetailsPage({ params }) {
  const { id } = params;
  const book = await getBook(id);

  if (!book) {
    return <div className="bookdetails-page__container">Book not found.</div>;
  }

  return (
    <div className="bookdetails-page__container">
      <Sidebar />

      <div className="search-bar-wrapper">
        <div className="search-container">
          <input type="text" placeholder="Search for books" />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <div className="content-divider" />

      <div className="bookdetails-page__header centered-layout">
        <div className="bookdetails-page__header-left">
          <h1 className="bookdetails-page__title">{book.title}</h1>
          <p className="bookdetails-page__author">{book.author}</p>
          <p className="bookdetails-page__subtitle">{book.description}</p>

          <div className="bookdetails-page__stats">
            <div className="bookdetails-page__stats-column">
              <div className="bookdetails-page__stat-item">
                ⭐ {book.rating} ({book.rating ? `${book.rating} ratings` : 'No ratings'})
              </div>
              <div className="bookdetails-page__stat-item">
                🎧 Audio & Text
              </div>
            </div>
            <div className="bookdetails-page__stats-column">
              <div className="bookdetails-page__stat-item">
                ⏱ {book.duration}
              </div>
              <div className="bookdetails-page__stat-item">
                💡 {book.keyIdeas} Key ideas
              </div>
            </div>
          </div>

          <div className="content-divider" />

          <div className="bookdetails-page__actions">
            <button className="bookdetails-page__btn bookdetails-page__btn--primary">
              <FaBookOpen size={18} /> Read
            </button>
            <button className="bookdetails-page__btn bookdetails-page__btn--primary">
              <FaMicrophone size={18} /> Listen
            </button>
          </div>

          <button className="bookdetails-page__add-library-btn">
            <FaBookmark size={18} /> Saved in My Library
          </button>
        </div>

        <div className="bookdetails-page__header-right">
          <img
            className="bookdetails-page__image"
            src={book.image}
            alt={book.title}
          />
        </div>
      </div>
    </div>
  );
}
