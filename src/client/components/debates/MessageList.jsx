import React from 'react';

import Message from './Message';

function MessageList({ getMessages, messages }) {
  return (
    <div className="bg-neutral-100">
        {messages.map((message) => (
          <Message getMessages={getMessages} message={message} />
        ))}
      </div>
  );
}

export default MessageList;