import React from 'react';
import './global.css'
import Authorization from './Components/Authorization/Authorization';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage';
import Registration from './Components/Registration/Registration';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/chat" element={<MainPage/>} />
        <Route path="/registration" element={<Registration/>} />
      </Routes>
    </div>
  );
}

export default App;
