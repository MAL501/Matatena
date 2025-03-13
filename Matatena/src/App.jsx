import {  } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import Options from './components/Options'
import './App.css'
import Table from './components/Table';

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Options />} />
        <Route path='/play' element={Table}/>
        <Route path='/instructions' />
        <Route path='/ranking' />
        <Route path='/login' />
        <Route path='/register' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
