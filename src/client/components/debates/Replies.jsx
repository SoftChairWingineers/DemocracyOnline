import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';


function Replies({ reply, getFlairColor }) {
  const [newReply, setNewReply] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flairs, setFlairs] = useState([]);

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
    getReplyInfo();
  }, []);

  return (
<div>
<p key={reply.id} className="text-sm text-gray-700">↳ {reply.content}</p>
<p className="text-sm text-gray-700">{reply.user.displayName}</p>
<div>
      {flairs.map((flair) => (
        <span className={`px-2 py-1 text-[8px] font-semibold text-white rounded-full whitespace-nowrap ${getFlairColor(flair)}`}>{flair}</span>
      ))}
      </div>
</div>
  );
}

export default Replies;




