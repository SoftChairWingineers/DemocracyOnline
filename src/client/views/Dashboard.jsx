import React from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Welcome to Democracy Online</h1>
      <div>
        <h4>If you would like to leave...</h4>
        <button><a href="/logout">Logout</a></button>
      </div>
      <div>
        <h4>Your Current Political Philosophies</h4>
        <button><a href='/politicalPhilosophy'>Update My Philosophies</a></button>
      </div>
    </div>

  );
}

export default Dashboard;
