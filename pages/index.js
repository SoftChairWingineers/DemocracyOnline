export default function Home({ user }) {
  return (
    <div>
      <h1>Welcome, {user?.displayName}</h1>
      <a href="/api/auth/logout">Logout</a>
        <h1>Login</h1>
            <a href="/api/auth/google">Sign in with Google</a>
    </div>
  );
}