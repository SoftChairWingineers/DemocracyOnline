import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PhilosophyBox() {

  const [flairs, setFlairs] = useState([]);


  const getUserInfo = () => {

    axios.get('/api/politicalPhilosophy/getTopics')
    .then((usersPoliticalViews) => {
      console.log('successfully got topicsss', usersPoliticalViews);
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


  return (
<div
  onClick={() => (window.location.href = "/politicalPhilosophy")}
  className="border-blue-primary border-2 rounded-3xl p-4 w-full md:max-w-[600px] 
    lg:w-1/5 min-h-[150px] md:min-h-[150px] lg:min-h-[350px] hover:cursor-pointer 
    sm:mb-6 md:mb-6 hover:bg-gray-400/30 hover:shadow-md hover:scale-105 transition flex flex-col items-center"
>
  <h2 className="w-full text-center text-lg font-bold pb-2">Your Beliefs</h2>
  
  {/* Centered Grid Layout for Flair Buttons */}
  <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-2 w-full justify-center">
    {flairs.map((flair, index) => (
      <button
        key={index}
        className="flex items-center justify-center text-center text-sm 
          font-bold text-white rounded-lg transition-all duration-300 
          bg-red-primary hover:bg-blue-primary"
      >
        {flair}
      </button>
    ))}
  </div>
</div>
  );
}
