"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="layout__foryou">
      <div className="main-content__foryou">
        <div className="page-foryou">
          <div className="selected-box-container">
            <div className="foryou-skeleton-title" />
            <div className="foryou-skeleton-card" />
            <div className="foryou-skeleton-card" />
            <div className="foryou-skeleton-card" />
          </div>

          <section className="rfy-container">
            <div className="foryou-skeleton-title" />
            <div className="foryou-skeleton-subtitle" />
            <div className="rfy-book-row">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rfy-book-card foryou-skeleton-card">
                  <div className="foryou-skeleton-image" />
                  <div className="foryou-skeleton-text long" />
                  <div className="foryou-skeleton-text short" />
                  <div className="foryou-skeleton-text short" />
                </div>
              ))}
            </div>
          </section>

          <section className="suggested-books__skeleton">
            <div className="foryou-skeleton-title" />
            <div className="suggested-books__row">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="foryou-skeleton-book" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
