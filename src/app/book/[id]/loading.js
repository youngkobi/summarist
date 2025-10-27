// app/book/[id]/loading.js
import Sidebar from "@/components/sidebar";
import Modal from "@/components/Modal";
import NavbarForYou from "@/components/NavbarForYou";

export default function LoadingBookDetails() {
  return (
    <div className="bookdetails-page__container">
      <Sidebar />
      <Modal />
      <NavbarForYou />

      <div className="content-divider" />

      <div className="bookdetails-page__header centered-layout">
        <div className="bookdetails-page__header-left">
          <div className="bookdetails-skeleton-title" />
          <div className="bookdetails-skeleton-text short" />
          <div className="bookdetails-skeleton-text medium" />

          <div className="bookdetails-page__stats">
            <div className="bookdetails-page__stats-column">
              <div className="bookdetails-skeleton-text short" />
              <div className="bookdetails-skeleton-text short" />
            </div>
            <div className="bookdetails-page__stats-column">
              <div className="bookdetails-skeleton-text short" />
              <div className="bookdetails-skeleton-text short" />
            </div>
          </div>

          <div className="content-divider" />

          <div className="bookdetails-skeleton-button" />
          <div className="bookdetails-skeleton-button small" />
        </div>

        <div className="bookdetails-page__header-right">
          <div className="bookdetails-skeleton-image" />
        </div>
      </div>

      <div className="bookdetails-page__info-section">
        <div className="bookdetails-skeleton-text title" />
        <div className="bookdetails-skeleton-tag" />
        <div className="bookdetails-skeleton-tag" />
        <div className="bookdetails-skeleton-paragraph" />
        <div className="bookdetails-skeleton-paragraph short" />
      </div>
    </div>
  );
}
