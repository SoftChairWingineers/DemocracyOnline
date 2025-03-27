import React, { useState, useEffect } from "react";

export default function NewsBox() {
  const [articles, setArticles] = useState([]);
  const [currArticle, setCurrArtile] = useState({});

  const getNews = () => {
    // Make request to get news articles for the day
    // Set the articles array
    // Set currArticle to the first element
  };

  useEffect(getNews);

  return (
    <div className="flex flex-col gap-2 px-4 md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] mx-auto">
      <div className="font-semibold text-2xl pl-4">Current News</div>
      <div className="flex flex-col md:flex-row border-blue-primary border-2 rounded-3xl p-4 min-h-[250px] gap-6">
        <div className="flex flex-col gap-2 md:w-1/3">
          <img
            src="/path/to/image.jpg"
            alt="Article"
            className="w-full h-auto rounded-xl object-cover"
          />
          <h2 className="text-xl font-semibold text-neutral-dark">
            Article Headline
          </h2>
        </div>
        <div className="md:w-2/3 text-neutral-dark">
          <p>
            This is the article description. On smaller screens it stacks
            beneath the image. On medium and larger screens, it sits to the
            right of the image.
          </p>
        </div>
      </div>
    </div>
  );
}
