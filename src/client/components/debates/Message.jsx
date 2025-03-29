import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';

function Message({ getMessages, message }) {
  const [newReply, setNewReply] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const postReply = () => {
    axios.post('/api/message/reply', {
      reply: {
        content: aiResponse.factCheckedMessage,
        messageId: message.id,
      }
    })
      .then(getMessages)
      .then(() => {
        setNewReply('');
        setAiResponse(null);
      })
      .catch((error) => {
        console.error('Failed to postReply:', error);
      })
  };

  const aiFactChecker = () => {
    setIsLoading(true);
    axios.post('/api/ai/fact', {
      message: newReply,
    })
      .then(({ data }) => {
        setAiResponse(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fact check with AI: ', error);
      });
  };

  const getUserInfo = () => {
    let userEmail = message.user.email
    axios.get('/api/politicalPhilosophy/flairs', {
      params: {
        email: userEmail,
      }
    })
    .then((response) => {
      // Handle successful response
      console.log(response.data, ' their flairs ');
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
  }

  useEffect(() => {
    getUserInfo();
  }, [])
  return (
    <div key={message.id} className="mb-4 p-3 border rounded">
      <p>{message.content}</p>
      <p>{message.user.displayName}</p>
      {/* Replies */}
      <div className="mt-2 ml-4">
        {message.replies.map((reply) => (
          <p key={reply.id} className="text-sm text-gray-700">↳ {reply.content}</p>
        ))}
      </div>

      {
        // AI Response
        aiResponse ? (
          <div className="mt-4 mb-4">
            <h1 className="text-xl font-bold mb-4">Updated Reply to Post</h1>
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
                onClick={postReply}
              >
                Submit Updated Reply
              </button>
            </div>
          </div>
        ) : (
          
          // Loading screen
          isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-12 h-12 text-blue-primary animate-spin" />
            </div>
          ) : (
            
            // Reply Input
            <div className="mt-2">
              <input
                type="text"
                className="w-full p-1 border rounded"
                placeholder="Reply..."
                value={newReply}
                onChange={(e) => { setNewReply(e.target.value); }}
              />
              <button
                className="mt-1 bg-red-primary text-white px-2 py-1 rounded"
                onClick={aiFactChecker}
              >
                Reply
              </button>
            </div>
          )
        )
      }
      
    </div>
  );
}

export default Message;
