import './App.css';
import { useState } from 'react';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import UserState from './context/notes/UserState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <div>
      <NoteState>
      <UserState>
        <Router>
          <Navbar showalert={showalert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showalert={showalert}/>} />
              <Route exact path="/signup" element={<Signup showalert={showalert}/>} />
              <Route exact path="/" element={<Home showalert={showalert}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </UserState>
      </NoteState>
    </div>
  );
}

export default App;
