// app/booksummary/[id]/loading.js
import NavbarForYou from "@/components/NavbarForYou";
import Sidebar from "@/components/sidebar";
import Modal from "@/components/Modal";

export default function LoadingBookSummary() {
  return (
    <div className="outside__player-container">
      <NavbarForYou />
      <div className="content-divider" />

      <div className="book-summary__container">
        <Sidebar />
        <Modal />

        <div className="book-summary__content">
          <div className="booksummary-skeleton-title" />
          <div className="booksummary-skeleton-bar" />
          <div className="booksummary-skeleton-text long" />
          <div className="booksummary-skeleton-text long" />
          <div className="booksummary-skeleton-text medium" />
          <div className="booksummary-skeleton-text short" />
        </div>

        <div className="booksummary-skeleton-player">
          <div className="booksummary-skeleton-player-image" />
          <div className="booksummary-skeleton-player-info">
            <div className="booksummary-skeleton-text medium" />
            <div className="booksummary-skeleton-text short" />
          </div>
        </div>
      </div>
    </div>
  );
}
