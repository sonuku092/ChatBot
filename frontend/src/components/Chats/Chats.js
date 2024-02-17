import React from 'react'
import { Link } from 'react-router-dom';


function Chats(props) {
  return (
    <div>
        <h2>
          {props.name ? `Welcome - ${props.name}` : "Please Login"}
        </h2>    
      </div>
  )
}

export default Chats
