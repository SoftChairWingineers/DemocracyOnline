import React from "react";
import HotTopics from "../components/HotTopics";
import NewsBox from "../components/NewsBox";
import PhilosophyBox from "../components/PhilosophyBox";

function Dashboard() {
  return (
    <div>
      <div>
        <HotTopics />
        <div className="flex flex-col lg:flex-row gap-3 items-center px-6">
        <NewsBox />
        <PhilosophyBox />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
