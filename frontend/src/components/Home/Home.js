import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'

function Home( props) {

  const handelSignout = ()=>{
    signOut(auth)
  }
  return (
    <div>
      <div>
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        <br />
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
      </div>
      <br/>
      <br/>
      <br/>

      <h2>{props.name ? `Welcome - ${props.name}` : "Login Plese"}</h2>

      <button onClick={handelSignout}>Log out</button>

    </div>
  )
}

export default Home
