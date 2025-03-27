import React, { useEffect } from "react";
import axios from 'axios';

function PoliticalPhilosophy() {

const getAllTopics = () => {
  axios.get('api/politicalPhilosophy/getTopics')
    .then((value) => {
      console.log('successfully got topics', value);
    })
    .catch((err) => {
      console.error('there is a fuck up w/ topics', error)
    })
}

useEffect(() => {
  getAllTopics();
})

  return (
    <h1 className="p-6 text-center mb-1 text-xl font-semibold text-red-600">ayye</h1>
  )

}

export default PoliticalPhilosophy;