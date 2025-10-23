'use client';

import Image from "next/image";
import toppic from "../../assets/pricing-top.webp";
import { useEffect, useRef, useState } from "react";
import FaqSalespage from "@/components/FaqSalespage";
import SalesFooter from "@/components/SalesFooter";

export default function Home() {
  const pricingRef = useRef(null);     // Marker at bottom of pricing section
  const [activePlan, setActivePlan] = useState(null); // Track the active plan

  const [hasScrolledPastPricing, setHasScrolledPastPricing] = useState(false);
  const [hasReachedStopMarker, setHasReachedStopMarker] = useState(false);

  // Combine states to control sticky behavior
  const isStuck = hasScrolledPastPricing && !hasReachedStopMarker;

  useEffect(() => {
    const pricingObserver = new IntersectionObserver(
      ([entry]) => {
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


    if (pricingRef.current) pricingObserver.observe(pricingRef.current);


    return () => {
      if (pricingRef.current) pricingObserver.unobserve(pricingRef.current);
    };
  }, []);

  const pricingOptions = [
    { label: "Premium Plus Yearly", price: "$99.99/year", trial: "7-day free trial included" },
    { label: "Premium Monthly", price: "$9.99/month", trial: "No trial included" },
  ];

  const handleActive = (index) => {
    setActivePlan(index); // Set the clicked item as active
  };

  // Determine the CTA button text based on the active plan
  const getCtaButtonText = () => {
    if (activePlan === 0) {
      return 'Start your free 7-day trial'; // For "Premium Plus Yearly"
    }
    return 'Start your first month'; // Default text for other plans
  };

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
            <div className="choose-plan-feature-middlesub"> 
              <span className="choose-plan-feature-title"> 
              3 million  
              </span> people growing with Summarist everyday</div>
      
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

      {/* Pricing Section with ref */}
      <div className="choose-plan-pricing-section" ref={pricingRef}>
        <h2 className="pricing-title">Choose the plan that fits you</h2>

        {pricingOptions.map((option, index) => (
          <div key={index}>
            {/* Pricing Option */}
            <div
              className={`pricing-option ${activePlan === index ? "active" : ""}`}
              onClick={() => handleActive(index)} // Set the clicked option as active
            >
              <input
                type="radio"
                id={`plan-${index}`}
                name="plan"
                checked={activePlan === index}
                onChange={() => handleActive(index)} // Optional: to handle radio input change
              />
              <label htmlFor={`plan-${index}`}>
                <div className="circle"></div> {/* Circle div */}
                <strong>{option.label}</strong>
                <div className="price">{option.price}</div>
                <div className="trial">{option.trial}</div>
              </label>
            </div>

            {/* Gray Bar and OR separator between the options */}
            {index === 0 && (
              <div className="grey-bar-container">
                <div className="grey-bar"></div>
                <span className="or-text">OR</span>
                <div className="grey-bar"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky or Static CTA */}
      {isStuck ? (
        <div className="sticky-cta stuck">
          <button className="choose-plan-cta-button">
            {getCtaButtonText()} {/* Dynamic button text */}
          </button>
          <p className="trial-message">
            Cancel your trial at any time before it ends, and you won’t be charged.
          </p>
        </div>
      ) : (
        <div className="static-cta">
          <button className="choose-plan-cta-button">
            {getCtaButtonText()} {/* Dynamic button text */}
          </button>
          <p className="trial-message">
            Cancel your trial at any time before it ends, and you won’t be charged.
          </p>
        </div>
      )}
      {/* FAQ and Footer */}
      <FaqSalespage />
      <SalesFooter />
    </div>
  );
}
