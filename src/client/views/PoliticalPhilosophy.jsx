import React, { useEffect, useState } from "react";
import axios from 'axios';
import Survey from "./Survey";

function PoliticalPhilosophy() {

  const [ allTopics, setAllTopics ] = useState([]);

  const getAllTopics = () => {
    axios.get('/api/politicalPhilosophy/getTopics')
      .then((usersPoliticalViews) => {
        console.log('successfully got topicsss', usersPoliticalViews);
        let allTopics = [];
        for(let key in usersPoliticalViews.data[0]){
          console.log(usersPoliticalViews.data[0])
          if(usersPoliticalViews.data[0][key] && key !== 'createdAt' && key !== 'updatedAt' && key !== 'email' && key !== 'id' ){
            console.log(usersPoliticalViews.data[0][key], 'parsing this');
            console.log(key, 'the key');

            let parsed = JSON.parse(usersPoliticalViews.data[0][key]);
          console.log(parsed, 'the parsed object');
              allTopics.push({ 
                topic: key, 
                answer: parsed.answer,
                rating: parsed.rating,
            });
          } else {
            allTopics.push({ 
              topic: key, 
              answer: 'undecided',
              rating: 0,
          });
          }
          console.log(key, 'key for each topic');
          
        }
        setAllTopics(allTopics);
      })
      .catch((err) => {
        console.error('there is a fuck up w/ topics', err)
      })
  }

useEffect(() => {
  getAllTopics();
}, []);

  return (
    <div>
    <h1 className="p-6 text-center mb-1 text-xl font-semibold text-red-600">ayye</h1>
    <div className="grid grid-cols-3 gap-2 mb-2">
    {allTopics.map((survey) => (
      <Survey topic={survey.topic} answer={survey.answer} rating={survey.rating}></Survey>
  ))}
  </div>
  </div>
  )

}

export default PoliticalPhilosophy;