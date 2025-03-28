import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PostMessage from '../components/debates/PostMessage';

function Debates(){
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state;
  const [messages, setMessages] = useState([]);
  
  const [replies, setReplies] = useState({});

  const getMessages = useCallback(() => {
    axios.get(`/api/message/${topic.id}`)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error('Failed to getMessages: ', error);
      });
  }, [topic]);

  const handleReply = (messageId, replyText) => {
    if (replyText.trim() === "") return;
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId
        ? { ...msg, replies: [...msg.replies, { id: Date.now(), text: replyText }] }
        : msg
    );
    setMessages(updatedMessages);
    setReplies({ ...replies, [messageId]: "" });
  };

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div>  
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Debate Topic: {topic.name}</h1>
      <button
        className="mb-4 bg-blue-primary text-white px-4 py-2 rounded"
        onClick={() => navigate("/dashboard")}
      >
        Return to Dashboard
      </button>
      <PostMessage getMessages={getMessages} topicId={topic.id} />
      <div>
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4 p-3 border rounded">
            <p>{msg.content}</p>
            {/* <div className="mt-2 ml-4">
              {msg.replies.map((reply) => (
                <p key={reply.id} className="text-sm text-gray-700">↳ {reply.text}</p>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="w-full p-1 border rounded"
                placeholder="Reply..."
                value={replies[msg.id] || ""}
                onChange={(e) => setReplies({ ...replies, [msg.id]: e.target.value })}
              />
              <button
                className="mt-1 bg-red-primary text-white px-2 py-1 rounded"
                onClick={() => handleReply(msg.id, replies[msg.id] || "")}
              >
                Reply
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Debates;