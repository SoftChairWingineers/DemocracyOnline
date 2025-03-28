import React from "react";

const hotTopics = ["Abortion", "Tariffs", "Gun Control", "The Border", "DOGE", "Middle East"];

export default function HotTopics() {
  return (
    <div className="flex flex-row flex-wrap gap-4 py-4 max-w-[75%] mx-auto justify-center">
      {hotTopics.map((topic) => (
        <div
          key={topic}
          className="border-accent-gold border-2 rounded-xl font-bold text-neutral-dark text-center px-4"
        >
          {topic}
        </div>
      ))}
    </div>
  );
}
