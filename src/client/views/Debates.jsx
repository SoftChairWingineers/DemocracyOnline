import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PostMessage from '../components/debates/PostMessage';
import MessageList from '../components/debates/MessageList';

function Debates(){
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state;
  const [messages, setMessages] = useState([]);
  const [allFlairs, setAllFlairs] = useState([]);

  const getMessages = useCallback(() => {
    axios.get(`/api/message/${topic.id}`)
      .then(({ data }) => {
        console.log(data, 'data received from getMessages, set to messagges')
        setMessages(data);
      })
      .catch((error) => {
        console.error('Failed to getMessages: ', error);
      });
  }, [topic]);

  useEffect(() => {
    console.log('got messages')
    getMessages();
  }, [getMessages]);

  // useEffect(() => {
  //   getUserInfo()
  // }, []);

  return (
    <div className="bg-neutral-100">
      <div className="max-w-2xl mx-auto p-6 bg-neutral-200 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Debate Topic: {topic.name}</h1>
        <button
          className="mb-4 bg-blue-primary text-white px-4 py-2 rounded"
          onClick={() => navigate("/dashboard")}
        >
          Return to Dashboard
        </button>
        <PostMessage getMessages={getMessages} topicId={topic.id} />
        <MessageList getMessages={getMessages} messages={messages} />
      </div>
    </div>
  );
}

export default Debates;