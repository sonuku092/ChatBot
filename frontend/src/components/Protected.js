import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {

    const Component = props.Component;

    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/home");
        }
    });

    

  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
