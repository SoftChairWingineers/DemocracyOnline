import React, { useEffect, useState } from "react";

function Survey({topic}){

  const [question, setQuestion] = useState('');
  const [rangeValue, setRangeValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');

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
        title = "What are your views on LGBTQ+ rights?";
        opt1 = "Support Equal Rights";
        opt2 = "Oppose LGBTQ+ Policies";
        break;
      case "religion":
        title = "Should religion play a role in government policies?";
        opt1 = "Yes, it should influence policies";
        opt2 = "No, government should be secular";
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
            src="https://via.placeholder.com/300x200" 
            alt="Card content"
            className="rounded-lg object-cover h-48 w-full"
          />
        </div>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
        <button type="button" class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
           {option1}
          </button>
          <button className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {option2}
          </button>
          <button className=" text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Undecided / Still Learning / Issue Is Complex
          </button>
          <button className=" text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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
        <h1>Current View: {topic}</h1>
      </div>
    </div>
</div>
  )

}

export default Survey;