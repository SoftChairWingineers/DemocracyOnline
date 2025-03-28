import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewsBox() {
  const [articles, setArticles] = useState([{
    id: 1,
    headline: "Supreme Court Ruling Shakes Up Debate",
    description:
      "The U.S. Supreme Court has issued a landmark decision today, setting off waves of political discussion across the country.",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    headline: "Economy Shows Signs of Recovery",
    description:
      "Recent data reveals an unexpected rise in job growth and consumer spending, fueling debates over fiscal policy.",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    headline: "Bipartisan Bill Aims to Improve Infrastructure",
    description:
      "Leaders from both parties have come together to propose sweeping reforms to modernize the nation’s roads and bridges.",
    image: "https://picsum.photos/600/400?random=3",
  },]);
  const [currArticle, setCurrArticle] = useState({});
  const [currArtIndex, setCurrArtIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const autoSlideTimer = useRef(null);

  const handleNext = () => {
    // Clear the timer for auto sliding
    clearTimeout(autoSlideTimer.current);
    setDirection("right");
    setCurrArtIndex((prev) => (prev + 1) % articles.length);
  };

  const handlePrev = () => {
    // Clear the timer for auto sliding
    clearTimeout(autoSlideTimer.current);
    setDirection("left");
    setCurrArtIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };
  // Fetch articles
  useEffect(() => {
    // Make request to get news articles for the day
    // Set the articles array
    // Set currArticle to the first element
  }, [currArtIndex, articles]);
  // Start auto slide timer
  // Effect for auto-slide
  useEffect(() => {
    autoSlideTimer.current = setTimeout(() => {
      handleNext();
    }, 10000);

    return () => clearTimeout(autoSlideTimer.current);
  }, [currArtIndex]);
  return (
    <div className="flex flex-col gap-2 px-4 md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
      <div className="font-semibold text-2xl pl-4">Current News</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={articles[currArtIndex].id}
          initial={{ x: direction === "left" ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "left" ? 100 : -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col md:flex-row border-blue-primary border-2 rounded-3xl p-4 min-h-[250px] gap-6"
        >
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-accent-gold text-neutral-dark p-2 rounded-full shadow disabled:opacity-50 hover:scale-105 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-gold text-neutral-dark p-2 rounded-full shadow disabled:opacity-50 hover:scale-105 transition"
          >
            <ChevronRight size={24} />
          </button>
          <div className="flex flex-col gap-2 pl-12 flex-shrink-0">
            <div className="w-full max-w-[90%] sm:max-w-[300px] md:w-64 lg:w-80 aspect-[3/2] mx-auto">
              <img
                src="https://picsum.photos/600/400"
                alt="Article"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-center md:text-left text-neutral-dark">
              Article Headline
            </h2>
          </div>
          <div className="text-neutral-dark md:pr-12 flex-1">
            <p>
              This is the article description. On smaller screens it stacks
              beneath the image. On medium and larger screens, it sits to the
              right of the image.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-4">
        {articles.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currArtIndex
                ? "bg-accent-gold"
                : "bg-gray-secondary opacity-40"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
