'use client';

import { useState } from 'react';

export default function FaqSalespage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does the free 7-day trial work?',
      answer:
        'Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.',
    },
    {
      question: 'Can I switch subscriptions from monthly to yearly, or yearly to monthly?',
      answer: 'While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.',
    },
    {
      question: "What's included in the Premium plan?",
      answer: 'Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.',
    },
    {
      question: 'Can I cancel during my trial or subscription?',
      answer: 'You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.',
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-question"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
              {openIndex === index ? '▲' : '▼'}
            </span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
