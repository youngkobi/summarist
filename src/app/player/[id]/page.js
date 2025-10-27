import AudioPlayer from "@/components/Audioplayer";
import Modal from "@/components/Modal";
import NavbarForYou from "@/components/NavbarForYou";
import Sidebar from "@/components/sidebar";
import React from "react";

async function getBook(id) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return {
    title: data.title || "Untitled",
    summary: data.summary || "No summary available.",
    author:data.author,
    image: data.imageLink,
    audioLink: data.audioLink 
  };
}

const BookSummaryPage = async ({ params }) => {
  const { id } = params;
  const book = await getBook(id);

  if (!book) {
    return <div className="book-summary__container">Book not found</div>;
  }

  return (
    <div className="outside__player-container">
     <NavbarForYou/>
      <div className="content-divider" />
      <div className="book-summary__container">
        <Sidebar />
        <Modal />

        <div className="book-summary__content">
          <h1 className="book-summary__title">{book.title}</h1>
          <div className="gray-bar-container">
            <div className="gray-bar"></div>
          </div>
          <p className="book-summary__text">{book.summary}</p>
        </div>
        <AudioPlayer
          text={book.summary}
          title={book.title}
          author={book.author || "Unknown Author"}
          image={book.image || "/placeholder.jpg"}
          audioLink={book.audioLink}
        />
      </div>
    </div>
  );
};

export default BookSummaryPage;
