import React from "react";

export default function PhilosophyBox() {
  return (
    <div
      onClick={() => (window.location.href = "/politicalPhilosophy")}
      className="flex flex-row flex-wrap lg:flex-col border-blue-primary border-2 rounded-3xl p-4 gap-4 w-full md:max-w-[600px] lg:w-1/5 min-h-[150px] md:min-h-[150px] lg:min-h-[350px] hover:cursor-pointer sm:mb-6 md:mb-6"
    >
      <h2 className="w-full text-center text-lg font-bold pb-2">
        Your Beliefs
      </h2>
    </div>
  );
}
