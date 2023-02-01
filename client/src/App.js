import './App.css';
import Login from './components/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Forgot from './components/Forgot';
import Register from './components/Register';
import Reset from './components/Reset';
import Otp from './components/Otp';
import PiPage from './components/PiPage';
import Test from './components/Test';
import Detail from './components/Detail';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/forgot' element={<Forgot/>}/>
        <Route exact path='/otp' element={<Otp/>}/>
        <Route exact path='/register' element={<Register/>}/> 
        <Route exact path='/reset' element={<Reset/>}/>
        <Route exact path='/pipage' element={<PiPage/>}/>
        <Route exact path='/pipage/detail' element={<Detail/>}/>
        <Route exact path='/test' element={<Test/>}/>

      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
