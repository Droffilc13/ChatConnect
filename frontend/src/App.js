import { useState } from "react";
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' component={HomePage} />
        <Route path='/chats' />
      </Routes>
    </div>
  )
}

export default App;
