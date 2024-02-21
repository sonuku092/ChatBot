import './App.css';
import React from 'react';  
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Chats from './components/Chats/Chats';
import Protected from './components/Protected';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Protected Component={ Chats  }/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
