import React, { useEffect, useState } from "react";

function Survey({topic}){

  const [question, setQuestion] = useState('');

  const handleQuestion = (subject) => {
    let title = "";
  
    switch (subject) {
      case "prochoice":
        title = "What is your stance on abortion rights?";
        break;
      case "immigration":
        title = "Do you support more lenient or stricter immigration policies?";
        break;
      case "environment":
        title = "How important is environmental protection to you?";
        break;
      case "wealthinequality":
        title = "Do you believe the government should address wealth inequality?";
        break;
      case "transgender":
        title = "Do you support transgender rights and protections?";
        break;
      case "orientation":
        title = "What are your views on LGBTQ+ rights?";
        break;
      case "religion":
        title = "Should religion play a role in government policies?";
        break;
      default:
        return; // Do nothing for 'email', 'updatedAt', 'createdAt', 'id'
    }

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
          <button className="aspect-square bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            1
          </button>
          <button className="aspect-square bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            2
          </button>
          <button className="aspect-square bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            3
          </button>
          <button className="aspect-square bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            4
          </button>
        </div>
        
        {/* Rating Slider */}
        <div className="mb-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rate this:
          </label>
          <input 
            type="range" 
            id="rating" 
            name="rating"
            min="0" 
            max="5" 
            step="1" 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {/* Star Rating Alternative */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} className="text-2xl">
              {star <= 3 ? '★' : '☆'} {/* Example with 3 stars filled */}
            </button>
          ))}
        </div>
      </div>
    </div>
</div>
  )

}

export default Survey;