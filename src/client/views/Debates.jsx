import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function Debates(){
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replies, setReplies] = useState({});

  useEffect(() => {
    /**
     * Get all messages from database
     */
    /*
    axios.get(-route to get messages-)
      .then((arrayOfMessages) => {
        setMessages(arrayOfMessages)
        })
      .catch((error) => {
        console.error('failed to get messages on debate topic', topic, error);
        })
    */

  }, []);

  const aiFactChecker = () => {
    /**
     * 
     * This is where we will have the message factchecked by ai, then returned for approval by the user
     * 
     */
    /*
    axios.get((-properAIRoute-, { query: newMessage }))
      .then((factChecked) => {
        **alert box that shows the new message**
        setNewMessage(factChecked);
        })
      .catch((error) => {
        console.error('failed to fact-check', error)
        })

    */
  handlePostMessage();
  }

  const handlePostMessage = () => {
    if (newMessage.trim() === "") return;
    const messageObj = { id: Date.now(), text: newMessage, replies: [] };
    setMessages([...messages, messageObj]);
    setNewMessage("");
  };

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

  return (
    <div>  
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Debate Topic: {topic}</h1>
      <button
        className="mb-4 bg-blue-primary text-white px-4 py-2 rounded"
        onClick={() => navigate("/dashboard")}
      >
        Return to Dashboard
      </button>
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
      <div>
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4 p-3 border rounded">
            <p>{msg.text}</p>
            <div className="mt-2 ml-4">
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
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Debates;