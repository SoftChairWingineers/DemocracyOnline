import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-light px-4">
      <p className="text-neutral-dark text-center text-xl max-w-xl mb-8 leading-relaxed px-4">
        A platform for open political debate, powered by real-time
        fact-checking. Share your opinions and let the facts speak.
      </p>
      <button>
        <a className="font-semibold" href="/api/auth/google">
          Log in with Google
        </a>
      </button>
    </div>
  );
}

export default Home;
