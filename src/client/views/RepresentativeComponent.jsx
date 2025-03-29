import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const RepresentativeLookup = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [representatives, setRepresentatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyDLxaZ5mByx5DWI-ClS8iwBJmlUwo70qks"; // Replace with your API key

  const fetchRepresentatives = () => {
    setLoading(true);
    setError("");
  
    if (!city || !state) {
      setError("Please enter both city and state.");
      setLoading(false);
      return;
    }
  
    
      const address = `${city}, ${state}`;
      
      const url = axios.get('/api/representatives/search', {
        params: {
          address,
        }
      }).then((response) => {
        console.log(response, 'response')
        console.log(response.data, 'response')
        const { offices, officials } = response.data;
          const reps = offices.flatMap((office) =>
          office.officialIndices.map((index) => ({
          office: office.name,
          name: officials[index].name,
          party: officials[index].party || "Unknown",
          phones: officials[index].phones || [],
          emails: officials[index].emails || [],
          photoUrl: officials[index].photoUrl || "https://via.placeholder.com/150",
        }))
      );
      setRepresentatives(reps);
      setLoading(false);
      }).catch((err) => {
        console.error(err, 'failed')
      })

  };

  return (
    <div className="flex flex-col items-center p-6">
      
      <h2 className="text-2xl font-bold mb-4">Find Your Representatives</h2>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Enter State (e.g., CA)"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={fetchRepresentatives}
          className="px-4 py-2 bg-red-primary text-white rounded-md hover:bg-blue-primary"
        >
          Search
        </button>
        <button
        className="px-4 py-2 bg-red-primary text-white rounded-md hover:bg-blue-primary"
        onClick={() => navigate("/dashboard")}
      >
        Return to Dashboard
      </button>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {representatives.map((rep, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
       <img
  src={rep.photoUrl}
  alt={rep.name}
  className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
  onError={(e) => {
    e.target.style.display = "none"; // Hide the broken image
    e.target.nextElementSibling.style.display = "block"; // Show the text
  }}
/>
<p className="text-red-500 font-bold text-center hidden">Failed to load image</p>
            <h3 className="text-lg font-bold text-center">{rep.name}</h3>
            <p className="text-center text-gray-600">{rep.office}</p>
            <p className="text-center text-sm text-gray-500">{rep.party}</p>
            {rep.phones.length > 0 && (
              <p className="text-sm mt-2">
                📞 <a href={`tel:${rep.phones[0]}`} className="text-blue-500">{rep.phones[0]}</a>
              </p>
            )}
            {rep.emails.length > 0 && (
              <p className="text-sm">
                ✉️ <a href={`mailto:${rep.emails[0]}`} className="text-blue-500">{rep.emails[0]}</a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepresentativeLookup;