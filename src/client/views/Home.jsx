import React from 'react';

function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h4>Log in here!</h4>
        <button><a href="/api/auth/google">Log in with Google</a></button>
      </div>
    </div>
  );
}

export default Home;
