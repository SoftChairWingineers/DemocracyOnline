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


  return (
    <h1>{ question }</h1>
  )

}

export default Survey;