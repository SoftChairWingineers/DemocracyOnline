import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Replies from './Replies';

function Message({ getMessages, message }) {
  const [newReply, setNewReply] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flairs, setFlairs] = useState([]);
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
    .then((usersPoliticalViews) => {
      // Handle successful usersPoliticalViews
      console.log(usersPoliticalViews.data, ' their flairs ');
      let allFlairs = [];
      for(let key in usersPoliticalViews.data[0]){
        console.log(usersPoliticalViews.data[0])
        if(usersPoliticalViews.data[0][key] && key !== 'createdAt' && key !== 'updatedAt' && key !== 'email' && key !== 'id' ){
          console.log(usersPoliticalViews.data[0][key], 'parsing this');
          console.log(key, 'the key');

          let parsed = JSON.parse(usersPoliticalViews.data[0][key]);
        console.log(parsed, 'the parsed object');
            allFlairs.push({ 
              topic: key, 
              answer: parsed.answer,
              rating: parsed.rating,
          });
          
        // } else {
        //   allTopics.push({ 
        //     topic: key, 
        //     answer: 'undecided',
        //     rating: 0,
        // });
        }
        console.log(key, 'key for each topic');
      }
      let processedFlairs = processResponses(allFlairs)
      setFlairs(processedFlairs);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
  }
  const getFlairColor = (flair) => {
    if (flair.includes('pro-choice')) return 'bg-blue-primary';
    if (flair.includes('pro-life')) return 'bg-red-700';
    if (flair.includes('lenient')) return 'bg-green-400';
    if (flair.includes('strict')) return 'bg-orange-700';
    if (flair.includes('environment')) return 'bg-lime-400';
    if (flair.includes('redistributionist')) return 'bg-yellow-700';
    if (flair.includes('laissez-faire')) return 'bg-amber-500';
    if (flair.includes('trans-inclusive')) return 'bg-purple-700';
    if (flair.includes('gender-essentialist')) return 'bg-amber-700';
    if (flair.includes('sex-positive')) return 'bg-pink-600';
    if (flair.includes('moral traditionalist')) return 'bg-red-primary';
    if (flair.includes('separation of church')) return 'bg-indigo-700';
    if (flair.includes('join church & state')) return 'bg-yellow-300';
    if (flair.includes('Unconcerned')) return 'bg-black';

    return 'bg-slate-950'; // Default color for unspecified flairs
  };

  const getReplyInfo = () => {
    let userEmail = reply.user.email
    axios.get('/api/politicalPhilosophy/flairs', {
      params: {
        email: userEmail,
      }
    })
    .then((usersPoliticalViews) => {
      // Handle successful usersPoliticalViews
      console.log(usersPoliticalViews.data, ' their flairs ');
      let allFlairs = [];
      for(let key in usersPoliticalViews.data[0]){
        console.log(usersPoliticalViews.data[0])
        if(usersPoliticalViews.data[0][key] && key !== 'createdAt' && key !== 'updatedAt' && key !== 'email' && key !== 'id' ){
          console.log(usersPoliticalViews.data[0][key], 'parsing this');
          console.log(key, 'the key');

          let parsed = JSON.parse(usersPoliticalViews.data[0][key]);
        console.log(parsed, 'the parsed object');
            allFlairs.push({ 
              topic: key, 
              answer: parsed.answer,
              rating: parsed.rating,
          });
          
        // } else {
        //   allTopics.push({ 
        //     topic: key, 
        //     answer: 'undecided',
        //     rating: 0,
        // });
        }
        console.log(key, 'key for each topic');
      }
      let processedFlairs = processResponses(allFlairs)
      setFlairs(processedFlairs);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
  }

const processResponses = (responses) => {
    return responses.map(({ topic, answer, rating }) => {
        switch (topic) {
            case `prochoice`:
                if (answer === `Pro-Choice`) return `pro-choice ${rating}/5`;
                if (answer === `Pro-Life`) return `pro-life ${rating}/5`;
                if (answer === "Undecided / Don`t Care") {
                  return `unconcerned on abortion`;
              }
                break;
            case `immigration`:
                if (answer === `Should be Lenient`) return `lenient immigration laws ${rating}/5`;
                if (answer === `Should be Strict`) return `strict immigration laws ${rating}/5`;
                break;
            case `environment`:
                if (answer === `High Priority`) return `environmentalist ${rating}/5`;
                if (answer === `Not a Priority`) return `anthropocentrist ${rating}/5`;
                break;
            case `wealthinequality`:
                if (answer === `Government should intervene more`) return `redistributionist economy ${rating}/5`;
                if (answer === `Let the free market handle it`) return `laissez-faire economy ${rating}/5`;
                break;
            case `transgender`:
                if (answer === `Support`) return `trans-inclusive ${rating}/5`;
                if (answer === `Do Not Support`) return `gender-essentialist ${rating}/5`;
                break;
            case `orientation`:
                if (answer === `Support All Sexual Orientations`) return `sex-positive ${rating}/5`;
                if (answer === `Sexuality should be between man & woman only`) return `moral traditionalist ${rating}/5`;
                break;
            case `religion`:
                if (answer === `Yes, it should influence policies`) return `join church & state ${rating}/5`;
                if (answer === `No, I Support Separation Of Church & State`) return `separation of church & state ${rating}/5`;
                break;
        }
        
        if (answer === "Undecided / Don't Care") {
            return `Unconcerned on ${topic} ${rating}/5`;
        }
        if (answer === 'Undecided / Still Learning / Topic is nuanced and needs deeper discussion') {
            return null; // Skip this response
        }
        if (answer === null) {
          return null; // Skip this response
      }
    }).filter(response => response !== null); // Remove null values
}

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div key={message.id} className="mb-4 p-3 border rounded">
      <div>
      <p>{message.user.displayName}</p>
      <div>
      {flairs.map((flair) => (
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full whitespace-nowrap ${getFlairColor(flair)}`}>
        {flair}
      </span>
            ))}
      </div>
      <p>{message.content}</p>
      {/* Replies */}
      <div className="mt-2 ml-4">
        {message.replies.map((reply) => (
          <Replies reply={reply} getFlairColor={getFlairColor}></Replies>
        ))}
      </div>
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
