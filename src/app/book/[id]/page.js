import AudioDurationRecs from '@/components/AudioDurationRecs';
import Modal from '@/components/Modal';
import NavbarForYou from '@/components/NavbarForYou';
import ReadListenButtons from '@/components/ReadListenButtons';
import SaveToLibraryButton from '@/components/SaveToLibraryFun';
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
    subtitle: data.subTitle || 'Untitled',
    author: data.author || 'Unknown Author',
    description: data.bookDescription || 'No description available.',
    image: data.imageLink || 'https://via.placeholder.com/150x220?text=No+Image',
    duration: data.duration || '03:24',
    rating: data.averageRating || '4.4',
    tRating: data.totalRating || '4.4',
    subscriptionRequired: data.subscriptionRequired || false,
    keyIdeas: data.keyIdeas || 0,
    categories: data.tags,
    authordesc: data.authorDescription,
    type: data.type,
    summary: data.summary,
    audioLink: data.audioLink || "",
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
      <Modal/>

     <NavbarForYou/>

      <div className="content-divider" />

      <div className="bookdetails-page__header centered-layout">
        <div className="bookdetails-page__header-left">
          <h1 className="bookdetails-page__title">{book.title}</h1>
          <p className="bookdetails-page__author">{book.author}</p>
          <p className="bookdetails-page__subtitle">{book.subtitle}</p>

          <div className="bookdetails-page__stats">
            <div className="bookdetails-page__stats-column">
              <div className="bookdetails-page__stat-item">
                ⭐ {book.rating} ({book.tRating ? `${book.tRating} ratings` : 'No ratings'})
              </div>
              <div className="bookdetails-page__stat-item">
                🎧 {book.type}
              </div>
            </div>
            <div className="bookdetails-page__stats-column">
              <div className="bookdetails-page__stat-item">
                ⏱              <AudioDurationRecs audioLink={book.audioLink} />

              </div>
              <div className="bookdetails-page__stat-item">
                💡 {book.keyIdeas} Key ideas
              </div>
            </div>
          </div>

          <div className="content-divider" />

         <ReadListenButtons bookId={book.id}
         subscriptionRequired={book.subscriptionRequired}/>

         <SaveToLibraryButton book={book}/>
        </div>

        <div className="bookdetails-page__header-right">
          <img
            className="bookdetails-page__image"
            src={book.image}
            alt={book.title}
          />
        </div>
      </div>

<div className="bookdetails-page__info-section">
  <h2>What's it about?</h2>
  <div className="bookdetails-page__tags">
    <span className="bookdetails-page__tag">{book.categories[1]}</span>
    <span className="bookdetails-page__tag">{book.categories[0]}</span>
  </div>
  <p>
    {book.description}
  </p>

  <h3>About the author</h3>
  <p>
{book.authordesc}  </p>
</div>

    </div>
  );
}
