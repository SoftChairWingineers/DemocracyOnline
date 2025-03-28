import React, { useState } from 'react';
import axios from 'axios';

function Message({ getMessages, message }) {
  const [newReply, setNewReply] = useState('');
  
  // const handleReply = (messageId, replyText) => {
  //   if (replyText.trim() === "") return;
  //   const updatedMessages = messages.map((msg) =>
  //     msg.id === messageId
  //       ? { ...msg, replies: [...msg.replies, { id: Date.now(), text: replyText }] }
  //       : msg
  //   );
  //   setMessages(updatedMessages);
  //   setReplies({ ...replies, [messageId]: "" });
  // };
  
  return (
    <div key={message.id} className="mb-4 p-3 border rounded">
      <p>{message.content}</p>
      <div className="mt-2 ml-4">
        {message.replies.map((reply) => (
          <p key={reply.id} className="text-sm text-gray-700">↳ {reply.content}</p>
        ))}
      </div>
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
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default Message;
