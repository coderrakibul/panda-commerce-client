import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Header from './pages/Shared/Header';
import Shop from './pages/Shop/Shop';

function App() {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/shop" element={<Shop></Shop>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </Header>

    </div>
  );
}

export default App;
