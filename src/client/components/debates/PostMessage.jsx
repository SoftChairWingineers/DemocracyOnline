import React, { useState } from 'react';
import axios from 'axios';

function PostMessage({ getMessages, topicId }) {
  const [newMessage, setNewMessage] = useState("");
  
  const postMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }
    axios.post('/api/message', {
      message: {
        content: newMessage,
        topicId,
      },
    })
      .then(getMessages)
      .then(() => {
        setNewMessage('');
      })
      .catch((error) => {
        console.error('Failed to postMessage: ', error);
      });
  };

  const aiFactChecker = () => {
    postMessage();
  }

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Your thoughts will be checked for reasonability by A.I. ..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-primary text-white px-4 py-2 rounded"
        onClick={aiFactChecker}
      >
        Post Message
      </button>
    </div>
  );
}

export default PostMessage;
