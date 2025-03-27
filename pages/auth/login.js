import { useSession, signIn, signOut } from "next-auth/react"

export default function SignIn() {
  const { data: session } = useSession()
  if(session) {
    return <>
      Signeddd in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signeddd in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}