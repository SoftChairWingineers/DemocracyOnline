import React from "react";
import HotTopics from "../components/HotTopics";
import NewsBox from "../components/NewsBox";

function Dashboard() {
  return (
    <div>
      <div>
        <HotTopics />
        <NewsBox />
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
