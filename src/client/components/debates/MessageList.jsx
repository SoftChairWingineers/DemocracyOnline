import React from 'react';

function MessageList({ getMessages, messages }) {
  return (
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
  );
}

export default MessageList;