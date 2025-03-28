import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import articlesObj from "../../data/articles.json";

export default function NewsBox() {
  const [articles, setArticles] = useState([]);
  const [currArtIndex, setCurrArtIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isLoading, setIsLoading] = useState(true);
  const autoSlideTimer = useRef(null);

  const currArticle = articles[currArtIndex];

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
    // Make request to '/api/articles'
    axios
      .get("/api/articles")
      .then(({ data }) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error retrieving articles from server: ", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      autoSlideTimer.current = setTimeout(() => {
        handleNext();
      }, 10000);
      return () => clearTimeout(autoSlideTimer.current);
    }
  }, [articles, isLoading, currArtIndex]);
  return (
    <div className="flex flex-col gap-2 px-4 md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
      <div className="font-semibold text-2xl pl-4">Current News</div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 text-blue-primary animate-spin" />
          </div>
        ) : (
          <motion.div
            key={articles[currArtIndex].title}
            initial={{ x: direction === "left" ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "left" ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col border-blue-primary border-2 rounded-3xl p-4 h-[450px] md:h-[400px] gap-6"
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
            <a
              href={currArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex flex-col gap-2 flex-shrink-0">
                <div className="w-full max-w-[90%] sm:max-w-[300px] md:w-64 lg:w-80 aspect-[3/2] mx-auto">
                  <img
                    src={currArticle.image}
                    alt="Article"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-neutral-dark text-center leading-snug max-w-[90%] mx-auto">
                  {currArticle.title}
                </h2>
              </div>
            </a>
            <div className="text-neutral-dark md:pr-12 flex-1 h-[100px] md:h-auto overflow-auto">
              <p>{currArticle.description}</p>
            </div>
          </motion.div>
        )}
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
