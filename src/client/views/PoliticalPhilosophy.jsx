import React, { useEffect, useState } from "react";
import axios from 'axios';
import Survey from "./Survey";

function PoliticalPhilosophy() {

  const [ allTopics, setAllTopics ] = useState([]);

  const getAllTopics = () => {
    axios.get('/api/politicalPhilosophy/getTopics')
      .then((value) => {
        console.log('successfully got topicsss', value);
        let allTopics = [];
        for(let key in value.data[0]){
          console.log(value.data[0])
          console.log(key, 'key for each topic');
          allTopics.push(key);
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
    {allTopics.map((topic) => (
      <Survey topic={topic}></Survey>
  ))}
  </div>
  </div>
  )

}

export default PoliticalPhilosophy;