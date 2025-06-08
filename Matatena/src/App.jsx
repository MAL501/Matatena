import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Options from './components/Options'
import './App.css'
import Table from './components/Table';
import InstructionsDialog from './components/InstructionsDialog';

function App() {

  return (
    <BrowserRouter basename="/Matatena">
      <Routes>
        <Route path='/' element={<Options />} />
        <Route path='/play' element={<Table />}/>
        <Route path='/waiting-room' element={<Table />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
