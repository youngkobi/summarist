"use client";
import Link from "next/link"; // ✅ CORRECT: Next.js routing link

import { useEffect, useState } from "react";
import AudioDurationRecs from "./AudioDurationRecs";

export default function RecommendedForYou() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL =
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended";

    async function fetchBooks() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        const mappedData = (data.results || data.items || data)
          .slice(0, 5)
          .map((item) => ({
              id: item.id,
            title: item.title || "Untitled",
            author: item.author || "Unknown Author",
            description:
              item.subTitle ||
              "No description available. Please check again later.",
            image:
              item.imageLink ||
              "https://via.placeholder.com/150x220?text=No+Image",
            duration: item.duration || "03:24",
            rating: item.averageRating || "4.4",
            subscriptionRequired: item.subscriptionRequired || false, // <-- Include this
            audioLink: item.audioLink || "",
          }));

        setBooks(mappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p className="rfy-loading">Loading recommendations...</p>;
  if (error) return <p className="rfy-error">Error: {error}</p>;

  return (
    <section className="rfy-container">
      <h2 className="rfy-title">Recommended For You</h2>
      <p className="rfy-subtext">We think you’ll like these</p>

      <div className="rfy-book-row">

        {books.map((book, index) => (
       <Link key={index} href={`/book/${book.id}`} className="rfy-book-link">
          <div key={index} className="rfy-book-card">
            <div className="rfy-book-cover-wrapper">
              <img
                src={book.image}
                alt={book.title}
                className="rfy-book-cover"
              />
              {book.subscriptionRequired && (
                <span className="rfy-premium-pill">Premium</span>
              )}
            </div>
            <h3 className="rfy-book-name">{book.title}</h3>
            <p className="rfy-book-author">{book.author}</p>
            <p className="rfy-book-desc">{book.description}</p>
            <div className="rfy-book-meta">
              <AudioDurationRecs audioLink={book.audioLink} />
              <span>⭐ {book.rating}</span>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
