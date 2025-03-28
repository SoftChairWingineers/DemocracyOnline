import React, { useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

function PostMessage({ getMessages, topicId }) {
  const [newMessage, setNewMessage] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const postMessage = () => {
    if (aiResponse === null) {
      return;
    }
    axios.post('/api/message', {
      message: {
        content: aiResponse.factCheckedMessage,
        topicId,
      },
    })
      .then(getMessages)
      .then(() => {
        setNewMessage('');
        setAiResponse(null);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error('Failed to postMessage: ', error);
      });
  };

  const aiFactChecker = () => {
    axios.post('/api/ai/fact', {
      message: newMessage,
    })
      .then(({ data }) => {
        setAiResponse(data);
      })
      .catch((error) => {
        console.error('Failed to fact check with AI: ', error);
      });
  }

  return (
    aiResponse ? (
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-4">Updated Message to Post</h1>
        <p className="mb-4">{aiResponse.factCheckedMessage}</p>
        <h1 className="text-xl font-bold mb-4">Reason for Change</h1>
        <p className="mb-4">{aiResponse.factCheckedStatement}</p>
        <div>
          <button
            className="mt-2 bg-blue-primary text-white px-4 py-2 rounded mr-2"
            onClick={() => { setAiResponse(null); }}
          >
            Back to the Drawing Board
          </button>
          <button
            className="mt-2 bg-blue-primary text-white px-4 py-2 rounded"
            onClick={postMessage}
          >
            Submit Updated Message
          </button>
        </div>
      </div>
    ) : (
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
    )
  );
}

export default PostMessage;
