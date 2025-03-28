import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewsBox() {
  const [articles, setArticles] = useState([{}, {}, {}, {}, {}]);
  const [currArticle, setCurrArticle] = useState({});
  const [currArtIndex, setCurrArtIndex] = useState(0);

  useEffect(() => {
    // Make request to get news articles for the day
    // Set the articles array
    // Set currArticle to the first element
  }, [currArtIndex, articles]);

  return (
    <div className="flex flex-col gap-2 px-4 md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
      <div className="font-semibold text-2xl pl-4">Current News</div>
      <div className="relative flex flex-col md:flex-row border-blue-primary border-2 rounded-3xl p-4 min-h-[250px] gap-6">
        <button
          onClick={() => {
            setCurrArtIndex(currArtIndex - 1);
          }}
          disabled={currArtIndex === 0}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-accent-gold text-neutral-dark p-2 rounded-full shadow disabled:opacity-50 hover:scale-105 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => {
            setCurrArtIndex(currArtIndex + 1);
          }}
          disabled={currArtIndex === articles.length - 1}
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
      </div>
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
