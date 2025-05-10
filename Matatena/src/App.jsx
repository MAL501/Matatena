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
        <Route path='/instructions' element={<InstructionsDialog />}/>
        <Route path='/ranking' />
        <Route path='/login' />
        <Route path='/register' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
