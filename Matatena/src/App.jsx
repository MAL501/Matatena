import {  } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import Options from './components/Options'
import './App.css'

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Options />} />
        <Route path='/play' />
        <Route path='/instructions' />
        <Route path='/ranking' />
        <Route path='/login' />
        <Route path='/register' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
