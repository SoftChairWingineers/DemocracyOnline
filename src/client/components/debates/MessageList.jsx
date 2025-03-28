import React from 'react';

import Message from './Message';

function MessageList({ getMessages, messages }) {
  return (
    <div>
        {messages.map((message) => (
          <Message getMessages={getMessages} message={message} />
        ))}
      </div>
  );
}

export default MessageList;