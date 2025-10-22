// src/app/selected/AudioDurationLoader.jsx
"use client";

import { useEffect, useState } from "react";

export default function AudioDurationLoader({ books }) {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    books.forEach((book) => {
      if (book.audioLink) {
        const audio = new Audio(book.audioLink);
        audio.addEventListener("loadedmetadata", () => {
          setDurations((prev) => ({
            ...prev,
            [book.id]: audio.duration,
          }));
        });
      }
    });
  }, [books]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {books.map((book) => (
        <div key={book.id} className="yellow-highlight-box">
          <div className="box-content">
            <div className="left-section">
              <p className="book-subtitle">{book.subTitle}</p>
            </div>

            <div className="vertical-divider"></div>

            <div className="right-section">
              <img src={book.imageLink} alt={book.title} className="book-cover" />
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
                <div className="book-duration">
                  <button className="play-button">▶</button>
                  <span>
                    {durations[book.id] ? formatTime(durations[book.id]) : "Loading..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
