"use client";

import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";

function NavbarForYou({ onOpenModal }) {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔍 Fetch books from your API
  const handleSearchChange = async (e) => {
    const text = e.target.value;
    setSearchText(text);

    if (text.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
          text
        )}`
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      // Assuming the API returns an array of book objects
      setResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching books:", error);
      setResults([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    router.push(`/book/${book.id}`);
    setShowDropdown(false);
    setSearchText("");
  };

  return (
    <div className="top-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for books"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button className="search-btn">🔍</button>

        {loading && (
          <div className="search-loading">Searching...</div>
        )}

        {showDropdown && results.length > 0 && (
          <div className="search-dropdown">
            {results.map((book) => (
              <div
                key={book.id}
                className="search-item"
                onClick={() => handleSelectBook(book)}
              >
                <img
                  src={book.imageLink}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-info">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <div className="book-meta">
                    <FaClock className="clock-icon" />
                    <span>{book.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showDropdown && !loading && results.length === 0 && (
          <div className="search-dropdown empty">No results found</div>
        )}
      </div>
    </div>
  );
}

export default NavbarForYou;
