import React, { useEffect, useState } from "react";
import axios from 'axios';

function Survey({topic, answer, rating}){

  const [question, setQuestion] = useState('');
  const [rangeValue, setRangeValue] = useState(rating);
  const [isDragging, setIsDragging] = useState(false);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [currentView, setCurrentView] =  useState('');
  const [newView, setNewView] =  useState('');
  const [allImages, setAllImages] = useState({
    prochoice: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Human_fetus_10_weeks_with_amniotic_sac_-_therapeutic_abortion.jpg/800px-Human_fetus_10_weeks_with_amniotic_sac_-_therapeutic_abortion.jpg',
    immigration: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCm2kV45dqxBH8SemJPZW1_Y2LiuX3xNd2qQ&s',
    environment: 'https://images.stockcake.com/public/d/e/a/deaa2eb5-4ac0-4777-85ce-4ba8e6738780_large/environmental-research-sampling-stockcake.jpg',
    wealthinequality: 'https://econreview.studentorg.berkeley.edu/wp-content/uploads/2018/03/Wealth-Inequality-in-the-United-States--768x359.png',
    transgender: 'https://i.ebayimg.com/images/g/9pgAAOSwyA1dpg0j/s-l1200.jpg',
    orientation: 'https://www.shutterstock.com/image-illustration/sexual-orientation-icon-symbol-shape-260nw-2219555487.jpg',
    religion: 'https://cdn.articles.media/news/6321e4137377e2aa7e3ff1cc/69d16df4-98f6-4014-a6c2-c8fe6703a63d-c1855e47-40b7-49a7-b4ab-b109bf63d20e.sized-1000x1000.jpg'
  })

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    console.log('Range value on pointer up:', rangeValue);
  };

  const handleRangeChange = (event) => {
    setRangeValue(parseInt(event.target.value, 10));
  };

  const updateNewView = (e) => {
    setNewView(e.target.innerText);
  }

  const updateView = (e) => {
    console.log(e.target.innerText, 'etargval')
    console.log(e.target, 'etarg')
    console.log(e, 'e')
    let views = {
      answer: newView,
      rating: rangeValue,
    }
    console.log(views, 'this is what they said');

    axios.post('/api/politicalPhilosophy/UpdateView', {
      body: {
        views,
        topic,
      }
    })
    .then(() => {
      console.log('post req sent')
    })
    .catch((err) => {
      console.error('error submitting new view')
    })
  }

  const handleQuestion = (subject) => {
    let title = "";
    let opt1 = null;
    let opt2 = null;

    switch (subject) {
      case "prochoice":
        title = "What is your stance on abortion rights?";
          opt1 = 'Pro-Choice';
          opt2 = 'Pro-Life';
        break;
      case "immigration":
        title = "Do you support more lenient or stricter immigration policies?";
        opt1 = 'Should be Lenient';
        opt2 = 'Should be Strict';
        break;
      case "environment":
        title = "How important is environmental protection to you?";
        opt1 = "High Priority";
        opt2 = "Not a Priority";
        break;
      case "wealthinequality":
        title = "How do you believe the government should address wealth inequality?";
        opt1 = "Government should intervene more";
        opt2 = "Let the free market handle it";
        break;
      case "transgender":
        title = "Do you support transgender rights and protections?";
        opt1 = "Support";
        opt2 = "Do Not Support";
        break;
      case "orientation":
        title = "Do you believe in the freedom from discrimination and the right to express one's sexuality";
        opt1 = "Support All Sexual Orientations";
        opt2 = "Sexuality should be between man & woman only";
        break;
      case "religion":
        title = "Should religion play a role in government policies?";
        opt1 = "Yes, it should influence policies";
        opt2 = "No, I Support Separation Of Church & State";
        break;
      default:
        return; // Do nothing for 'email', 'updatedAt', 'createdAt', 'id'
    }
    setOption1(opt1);
    setOption2(opt2);
    setQuestion(title);
  };

  useEffect(() => {
    handleQuestion(topic)
  }, [question])

if(question === ''){
  return null;
}
  return (
    <div>
   <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {question}
        </h2>
        
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img 
            src={allImages[topic]}
            alt="Card content"
            className="rounded-md object-cover h-30 w-full"
          />
        </div>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
        <button 
        onClick={updateNewView}
        type="button" className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
           {option1}
          </button>
          <button 
          onClick={updateNewView}
          className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {option2}
          </button>
          <button 
          onClick={updateNewView}
          className=" text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Undecided / Still Learning / Topic is nuanced and needs deeper discussion
          </button>
          <button 
          onClick={updateNewView}
          className=" text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Undecided / Don't Care
          </button>
        </div>
        
        {/* Rating Slider */}
        <div className="mb-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rate how much of a priority this should be for our country:
          </label>
          <input 

            type="range" 
            id="rating" 
            name="rating"
            min="0" 
            max="5" 
            step="1" 
            className="w-full h-2"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onChange={handleRangeChange}
            value={rangeValue}
          />
          <p>Value: {rangeValue}</p>
          {isDragging && <p>Dragging...</p>}
        </div>
        
        {/* Star Rating Alternative */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} className="text-2xl">
              {star <= rangeValue ? '★' : '☆'} {/* Example with 3 stars filled */}
            </button>
          ))}
        </div>
        <h1>Current View: {answer}</h1>
        </div>
        <div className="flex justify-center">
        <button onClick={updateView} type="button" className="flex justify-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Save</button>

        </div>
    </div>
</div>
  )

}

export default Survey;