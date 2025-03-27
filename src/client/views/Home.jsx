import React from "react";

function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <h4>Log in here!</h4>
        <button>
          <a href="/api/auth/google">Log in with Google</a>
        </button>
      </div>
      <div class="min-h-screen flex items-center justify-center bg-red-primary text-white text-3xl font-bold">
        Tailwind is working 🎉
      </div>
    </div>
  );
}

export default Home;
