import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HotTopics() {
  const [topics, setTopics] = useState([]);

  const getTopics = useCallback(() => {
    axios.get('/api/topic')
    .then(({ data }) => {
      setTopics(data);
    })
    .catch((error) => {
      console.error('Failed to getTopics:', error);
    });
  }, []);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  return (
    <div className="flex flex-row flex-wrap gap-4 py-4 max-w-[75%] mx-auto justify-center">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="border-accent-gold border-2 rounded-xl font-bold text-neutral-dark text-center px-4"
        >
          <Link state={topic.name} style={{ flex: 1 }} to={`/Debates/${topic.name}`}>
          {topic.name}
              </Link>
        </div>
      ))}
    </div>
  );
}
