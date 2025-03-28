import React from "react";
import HotTopics from "../components/HotTopics";
import NewsBox from "../components/NewsBox";

function Dashboard() {
  return (
    <div>
      <div className="text-center mt-8">
        <h1 className="text-4xl font-extrabold text-neutral-dark">
          DemocracyOnline
        </h1>
        <p className="text-gray-secondary mt-2 text-lg italic">
          Instant facts for every opinion
        </p>
      </div>
      <div className="w-full h-2 bg-gradient-to-r from-red-primary via-neutral-400 to-blue-primary" />
      <div>
        <HotTopics />
        <NewsBox />
        <h4>If you would like to leave...</h4>
        <button>
          <a href="/logout">Logout</a>
        </button>
      </div>
      <div>
        <h4>Your Current Political Philosophies</h4>
        <button>
          <a href="/politicalPhilosophy">Update My Philosophies</a>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
