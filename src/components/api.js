"use client";
import React, { useEffect, useState } from "react";

const SelectedForyou = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);

  if (!books.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="selected-box-container">
      <h2 className="section-title">Selected just for you</h2>

      {books.map((book) => (
        <div key={book.id} className="yellow-highlight-box">
          <div className="box-content">
            {/* Left side: Subtitle */}
            <div className="left-section">
              <p className="book-subtitle">{book.subTitle}</p>
            </div>

            {/* Divider */}
            <div className="vertical-divider"></div>

            {/* Right side: Book details */}
            <div className="right-section">
              <img
                src={book.imageLink}
                alt={book.title}
                className="book-cover"
              />

              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
                <div className="book-duration">
                  <button className="play-button">▶</button>
                  <span>3 mins 23 secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedForyou;
