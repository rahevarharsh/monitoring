import './App.css';
import Login from './components/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Forgot from './components/Forgot';
import Register from './components/Register';
import Reset from './components/Reset';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/forgot' element={<Forgot/>}/>
        <Route exact path='/register' element={<Register/>}/> 
        <Route exact path='/reset' element={<Reset/>}/>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
