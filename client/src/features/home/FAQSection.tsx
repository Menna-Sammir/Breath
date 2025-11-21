import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
  const [active, setActive] = useState(1);

  const faqs = [
    {
      id: 1,
      number: "01",
      question: "How do I make a booking?",
      answer:
        "You can book directly through our website by selecting your destination, dates, and preferences. Once confirmed, you’ll receive a booking summary and invoice via email.",
    },
    {
      id: 2,
      number: "02",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit and debit cards, as well as secure online payment options. You’ll receive a confirmation once your payment is processed.",
    },
    {
      id: 3,
      number: "03",
      question: "Can I hold a booking before paying?",
      answer:
        "Yes, some bookings can be held for a limited time before payment. Please check availability and terms when booking.",
    },
  ];

  return (
    <div className="py-12 lg:py-20">
      <div className="container flex flex-col justify-between gap-10 lg:flex-row">
        {/* Left Section */}
        <div className="space-y-4 lg:space-y-6">
          <h2 className="w-full max-w-185.75 text-2xl font-medium text-black sm:text-3xl lg:text-4xl/11 xl:text-5xl/16">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-dark w-full max-w-153.5 lg:text-lg/6">
            Still have questions? Our travel experts are here to make your
            journey smooth, from booking to boarding.
          </p>
          <a href="/faqs.html" className="btn btn-primary">
            View more
            <MoveUpRight />
          </a>
        </div>

        {/* Right Section */}
        <div className="w-full space-y-4 lg:max-w-175">
          {faqs.map((faq) => {
            const expanded = active === faq.id;
            return (
              <div
                key={faq.id}
                className={`border-gray-light shadow-3xl rounded-3xl border-2 transition-all duration-300 ${
                  expanded ? "bg-primary text-white" : "bg-white text-black"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActive(expanded ? 0 : faq.id)
                  }
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between gap-2 p-3.5 text-left text-lg/6 font-medium outline-none lg:p-5 lg:text-xl/6 xl:p-6 transition"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`text-3xl font-semibold sm:text-[40px]/13 ${
                        expanded ? "text-white/50" : "text-primary/30"
                      }`}
                    >
                      {faq.number}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span
                    className={`grid size-8 shrink-0 place-content-center rounded-full transition ${
                      expanded
                        ? "text-white bg-white/10"
                        : "text-primary bg-primary/10"
                    }`}
                  >
                    <MoveUpRight
                      className={`size-5.5 shrink-0 transition duration-300 ${
                        expanded ? "rotate-0" : "rotate-90"
                      }`}
                    />
                  </span>
                </button>

                {/* Animated answer section */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="relative -top-1 sm:-top-2 overflow-hidden"
                    >
                      <p className="px-4 pb-3 sm:px-6 sm:pb-4 lg:text-lg/6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
