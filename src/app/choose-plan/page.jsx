'use client';

import Image from "next/image";
import toppic from "../../assets/pricing-top.webp";
import { useEffect, useRef, useState } from "react";
import FaqSalespage from "@/components/FaqSalespage";
import SalesFooter from "@/components/SalesFooter";

export default function Home() {
  const pricingRef = useRef(null);     // Marker at bottom of pricing section
  const stopStickyRef = useRef(null);  // Marker before FAQ/Footer

  const [hasScrolledPastPricing, setHasScrolledPastPricing] = useState(false);
  const [hasReachedStopMarker, setHasReachedStopMarker] = useState(false);

  // Combine states to control sticky behavior
  const isStuck = hasScrolledPastPricing && !hasReachedStopMarker;

  useEffect(() => {
  const pricingObserver = new IntersectionObserver(
    ([entry]) => {
      // When top of pricing section is above the viewport top (i.e. scrolled past),
      // boundingClientRect.top will be negative
      if (entry.boundingClientRect.top <= 0) {
        setHasScrolledPastPricing(true);
      } else {
        setHasScrolledPastPricing(false);
      }
    },
    {
      threshold: 0,
      rootMargin: '0px 0px 0px 0px', // Observe relative to viewport top
    }
  );

  const stopObserver = new IntersectionObserver(
    ([entry]) => {
      setHasReachedStopMarker(entry.isIntersecting);
    },
    {
      threshold: 0,
    }
  );

  if (pricingRef.current) pricingObserver.observe(pricingRef.current);
  if (stopStickyRef.current) stopObserver.observe(stopStickyRef.current);

  return () => {
    if (pricingRef.current) pricingObserver.unobserve(pricingRef.current);
    if (stopStickyRef.current) stopObserver.unobserve(stopStickyRef.current);
  };
}, []);


  return (
    <div className="final_container-header">
      {/* Header */}
      <div className="choose-plan-header-wrapper">
        <h1 className="choose-plan-title">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="choose-plan-subtitle">
          Turn ordinary moments into amazing learning opportunities
        </p>
        <div className="choose-plan-image-mask">
          <Image src={toppic} alt="Hero Illustration" className="masked-image" />
        </div>
      </div>

      {/* Features */}
      <div className="choose-plan-container">
        <div className="choose-plan-features">
          <div className="choose-plan-feature-item">
            <div className="choose-plan-icon">📄</div>
            <div className="choose-plan-feature-title">Key ideas in few min</div>
            <div className="choose-plan-feature-subtext">with many books to read</div>
          </div>
          <div className="choose-plan-feature-item">
            <div className="choose-plan-icon">🌱</div>
            <div className="choose-plan-feature-title">3 million</div>
            <div className="choose-plan-feature-subtext">
              people growing with Summarist everyday
            </div>
          </div>
          <div className="choose-plan-feature-item">
            <div className="choose-plan-icon">🤝</div>
            <div className="choose-plan-feature-title">Precise recommendations</div>
            <div className="choose-plan-feature-subtext">
              collections curated by experts
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="choose-plan-pricing-section" ref={pricingRef}>
        <h2 className="pricing-title">Choose the plan that fits you </h2>

        <div className="pricing-option selected">
          <input type="radio" id="yearly" name="plan" defaultChecked />
          <label htmlFor="yearly">
            <strong>Premium Plus Yearly</strong>
            <div className="price">$99.99/year</div>
            <div className="trial">7-day free trial included</div>
          </label>
        </div>

        <div className="pricing-option">
          <input type="radio" id="monthly" name="plan" />
          <label htmlFor="monthly">
            <strong>Premium Monthly</strong>
            <div className="price">$9.99/month</div>
            <div className="trial">No trial included</div>
          </label>
        </div>
      </div>

      {/* Sticky or Static CTA */}
      {isStuck ? (
        <div className="sticky-cta stuck">
          <button className="choose-plan-cta-button">
            Start your free 7-day trial
          </button>
          <p className="trial-message">
            Cancel your trial at any time before it ends, and you won’t be charged.
          </p>
        </div>
      ) : (
        <div className="static-cta">
          <button className="choose-plan-cta-button">
            Start your free 7-day trial
          </button>
          <p className="trial-message">
            Cancel your trial at any time before it ends, and you won’t be charged.
          </p>
        </div>
      )}

      {/* Marker to stop sticky behavior before FAQ */}
      <div ref={stopStickyRef} style={{ height: "1px" }} />

      {/* FAQ and Footer */}
      <FaqSalespage />
      <SalesFooter />
    </div>
  );
}
