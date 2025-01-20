import { useState, useRef } from "react";
import { gsap } from "gsap";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const answerRefs = useRef([]);

  const faqs = [
    {
      question: "What is the best time to visit the Maldives?",
      answer:
        "The best time to visit the Maldives is between November and April, during the dry season.",
    },
    {
      question: "Do I need a visa to travel to Europe?",
      answer:
        "For many countries, a Schengen visa is required to visit multiple European nations.",
    },
    {
      question: "Are travel insurance and health insurance mandatory?",
      answer:
        "While not always mandatory, it is highly recommended to have travel and health insurance.",
    },
    {
      question: "What should I pack for a mountain trek?",
      answer:
        "Pack warm clothing, sturdy hiking boots, a first-aid kit, and sufficient water and snacks.",
    },
  ];

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      // Close if already open
      gsap.to(answerRefs.current[index], {
        height: 0,
        duration: 0.3,
        opacity: 0,
      });
      setActiveIndex(null);
    } else {
      // Open the selected answer
      if (activeIndex !== null) {
        gsap.to(answerRefs.current[activeIndex], {
          height: 0,
          duration: 0.3,
          opacity: 0,
        });
      }
      gsap.set(answerRefs.current[index], { height: "auto" });
      gsap.fromTo(
        answerRefs.current[index],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5 }
      );
      setActiveIndex(index);
    }
  };

  return (
    <section className="bg-[#F4E3CF] min-h-[90vh] flex items-center py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left text-lg font-semibold text-gray-800"
              >
                {faq.question}
              </button>
              <div
                ref={(el) => (answerRefs.current[index] = el)}
                className="overflow-hidden h-0 transition-height"
              >
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
